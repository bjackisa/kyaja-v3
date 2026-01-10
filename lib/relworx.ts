import crypto from "crypto";

const RELWORX_BASE_URL = process.env.RELWORX_BASE_URL || "https://payments.relworx.com/api";

type RelworxFetchOptions = {
  path: string;
  method?: "GET" | "POST";
  body?: unknown;
  query?: Record<string, string | number | undefined | null>;
};

export function getRelworxAuthHeaders() {
  const apiKey = process.env.RELWORX_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RELWORX_API_KEY");
  }

  return {
    Accept: "application/vnd.relworx.v2",
    Authorization: `Bearer ${apiKey}`,
  };
}

export function getRelworxAccountNo() {
  const accountNo = process.env.RELWORX_ACCOUNT_NO;
  if (!accountNo) {
    throw new Error("Missing RELWORX_ACCOUNT_NO");
  }
  return accountNo;
}

export function buildRelworxUrl(path: string, query?: RelworxFetchOptions["query"]) {
  const url = new URL(`${RELWORX_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function relworxFetch<T = any>(opts: RelworxFetchOptions): Promise<T> {
  const url = buildRelworxUrl(opts.path, opts.query);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...getRelworxAuthHeaders(),
  };

  const res = await fetch(url, {
    method: opts.method || "POST",
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const message = data?.message || `Relworx HTTP ${res.status}`;
    const err = new Error(message);
    (err as any).status = res.status;
    (err as any).data = data;
    throw err;
  }

  return data as T;
}

export function parseRelworxSignatureHeader(headerValue: string | null | undefined) {
  if (!headerValue) return null;

  const parts = headerValue.split(",").map((p) => p.trim());
  const kv: Record<string, string> = {};
  for (const p of parts) {
    const [k, ...rest] = p.split("=");
    if (!k || rest.length === 0) continue;
    kv[k.trim()] = rest.join("=").trim();
  }
  if (!kv.t || !kv.v) return null;
  return { timestamp: kv.t, signature: kv.v };
}

export function computeRelworxSignature({
  webhookKey,
  webhookUrl,
  timestamp,
  payload,
}: {
  webhookKey: string;
  webhookUrl: string;
  timestamp: string;
  payload: any;
}) {
  const relevantParams: Record<string, string> = {
    status: String(payload?.status ?? ""),
    customer_reference: String(payload?.customer_reference ?? ""),
    internal_reference: String(payload?.internal_reference ?? ""),
  };

  let signedData = webhookUrl + timestamp;
  for (const key of Object.keys(relevantParams).sort()) {
    signedData += key + String(relevantParams[key]);
  }

  const hmac = crypto.createHmac("sha256", webhookKey).update(signedData);
  return {
    hex: hmac.digest("hex"),
    base64: crypto.createHmac("sha256", webhookKey).update(signedData).digest("base64"),
  };
}

export function verifyRelworxWebhookSignature({
  signatureHeader,
  webhookUrl,
  payload,
}: {
  signatureHeader: string | null | undefined;
  webhookUrl: string;
  payload: any;
}) {
  const webhookKey = process.env.RELWORX_WEBHOOK_KEY;
  if (!webhookKey) {
    return { ok: true, skipped: true };
  }

  const parsed = parseRelworxSignatureHeader(signatureHeader);
  if (!parsed) return { ok: false, skipped: false };

  const computed = computeRelworxSignature({
    webhookKey,
    webhookUrl,
    timestamp: parsed.timestamp,
    payload,
  });

  const provided = parsed.signature;
  const ok = provided === computed.hex || provided === computed.base64;

  return { ok, skipped: false };
}

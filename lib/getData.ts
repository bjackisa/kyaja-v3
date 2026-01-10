export async function getData(endpoint:string) {
  try {
    const envBase = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL;
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
    const baseUrl = envBase || vercelUrl || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/${endpoint}`, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

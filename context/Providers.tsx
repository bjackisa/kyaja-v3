"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { SessionProvider } from "next-auth/react";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }:any) {
  return (
    <SessionProvider>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}

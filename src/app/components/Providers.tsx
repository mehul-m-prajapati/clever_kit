"use client";

import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"
import { NotificationProvider } from "./Notification";

const urlEndPoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

function Providers({children}: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
        <NotificationProvider>
            <ImageKitProvider urlEndpoint={urlEndPoint}>
                {children}
            </ImageKitProvider>
        </NotificationProvider>
    </SessionProvider>
  )
}

export default Providers

import type { Metadata } from 'next'
import {TRPCReactProvider} from "@/trpc/react";
import {cookies} from "next/headers";

export const metadata: Metadata = {
  title: 'Three example',
  description: 'Generated by create next app'
}

export default function ThreeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
        {children}
      </div>
    </TRPCReactProvider>
  )
}

'use client'

import * as React from 'react'
import { NextUIProvider, NextUIProviderProps } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
export function Providers({ children, ...props }: NextUIProviderProps) {
  const router = useRouter()
  return (
    <NextUIProvider {...props} navigate={router.push}>
      {children}
    </NextUIProvider>
  )
}

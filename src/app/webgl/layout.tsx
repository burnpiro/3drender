'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {Link} from "@nextui-org/react";


export default function WebGLLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className={'flex justify-between'}>

        <Link  href={'/webgl/planets'} isBlock showAnchorIcon color="secondary">
          Planets
        </Link>
        <Link  href={'/webgl/custom-shader'} isBlock showAnchorIcon color="secondary">
          Custom Shader
        </Link>
      </div>
      <Canvas>
        {children}
      </Canvas>
    </div>
  )
}

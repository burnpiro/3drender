'use client'

import {OrbitControls, shaderMaterial} from '@react-three/drei'
import { WaveMaterial } from './WaveMaterial'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'

export default function CustomShader() {
  const ref = useRef<any>(null!)
  const { viewport, size } = useThree()
  useFrame((state, delta) => {
    ref.current.time += delta
    //@ts-ignore
    easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
  })
  return (
    <>
      <gridHelper />
      <ambientLight args={[0.4]}/>
      <mesh scale={[viewport.width, viewport.height, viewport.height]}>
        <sphereGeometry args={[0.4, 64, 32]}/>
        <waveMaterial
          ref={ref}
          key={WaveMaterial.key}
          //@ts-ignore
          resolution={[size.width * viewport.dpr, size.height * viewport.dpr, size.height * viewport.dpr]}
        />
      </mesh>
      <OrbitControls />
    </>
  )
}

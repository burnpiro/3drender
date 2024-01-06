'use client'

import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber'
import {CubeCamera, OrbitControls, OrthographicCamera, PerspectiveCamera, useHelper} from '@react-three/drei'
import { useRef } from 'react'
import { GridHelper, Mesh, PointLightHelper, TextureLoader } from 'three'

function Earth(props: MeshProps) {
  const ref = useRef<any>()
  const [map] = useLoader(TextureLoader, ['/eath.jpg'])

  useFrame((state, delta) =>
    ref.current ? (ref.current.rotation.y += delta) : delta
  )

  return (
    <mesh {...props} ref={ref} scale={1} castShadow={true}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshStandardMaterial map={map} />
    </mesh>
  )
}

function Moon(props: MeshProps) {
  const ref = useRef<any>()
  const [map] = useLoader(TextureLoader, ['/moon.jpg'])

  useFrame((state, delta) =>
    ref.current ? (ref.current.rotation.y += delta / 28) : delta / 28
  )

  return (
    <mesh {...props} ref={ref} scale={0.3} castShadow={true}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshStandardMaterial map={map}/>
    </mesh>
  )
}

function Sun(props: MeshProps) {
  const lightRef = useRef<any>()

  useHelper(lightRef, PointLightHelper)

  const ref = useRef<any>()
  const [map] = useLoader(TextureLoader, ['/sun.jpg'])

  return (
    <mesh {...props} ref={ref} scale={0.3} castShadow={true}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshStandardMaterial map={map} />
      <pointLight ref={lightRef} args={['white', 30]} castShadow={true} />
      <ambientLight args={[0.1]}/>
    </mesh>
  )
}

export default function Planets() {
  const groupRef = useRef<any>()

  useFrame((state, delta) =>
    groupRef.current ? (groupRef.current.rotation.y += delta / 4) : delta
  )

  return (
    <>
      <PerspectiveCamera makeDefault position={[8,3,3]} />
      <gridHelper />
      <Earth />
      <Sun position={[8, 0, 0]} />
      <group ref={groupRef}>
        <Moon position={[2, 0, 0]} />
      </group>
      <OrbitControls />
    </>
  )
}

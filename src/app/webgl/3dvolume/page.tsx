'use client'

import * as THREE from 'three'

import { OrbitControls, shaderMaterial } from '@react-three/drei'
import { VolumeRenderShader } from './VolumeRenderShader'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import {useEffect, useRef, useState} from 'react'
import { NRRDLoader } from 'three-stdlib'
import { TextureLoader } from 'three'

let texture: THREE.Data3DTexture | null = null

let geometry = new THREE.BoxGeometry()

export default function CustomShader() {
  const ref = useRef<any>(null!)
  const [currGeometry, setCurrGeometry] = useState<any>();

  const { viewport, size } = useThree()
  const h = 512; // frustum height
  const aspect = size.width / size.height;

  const volume = useLoader(NRRDLoader, '/volume/stent.nrrd')
  const [gray, viridis] = useLoader(TextureLoader, [
    '/volume/cm_gray.png',
    '/volume/cm_viridis.png'
  ])
  // useFrame((state, delta) => {
  //   ref.current.time += delta
  //   //@ts-ignore
  //   easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
  // })
  useEffect(() => {

     console.log(volume.xLength)
    texture = new THREE.Data3DTexture(
      volume.data as Float32Array,
      volume.xLength,
      volume.yLength,
      volume.zLength
    )
    texture.format = THREE.RedFormat
    texture.type = THREE.FloatType
    texture.minFilter = texture.magFilter = THREE.LinearFilter
    texture.unpackAlignment = 1
    texture.needsUpdate = true;

    geometry = new THREE.BoxGeometry(volume.xLength, volume.yLength, volume.zLength);
    geometry.translate(volume.xLength / 2 - 0.5, volume.yLength / 2 - 0.5, volume.zLength / 2 - 0.5);
    setCurrGeometry(geometry);
  }, [volume])
  console.log(volume, texture)
  if(texture == null) {
    return <></>
  }


  return (
    <>
      {/*<gridHelper/>*/}
      <orthographicCamera args={[- h * aspect / 2, h * aspect / 2, h / 2, - h / 2, 1, 1000]} position={[-64, -64, 128]} up={[0,0,1]}/>
      <mesh>
        <boxGeometry
          args={[volume.xLength, volume.yLength, volume.zLength]}
          translate={() => geometry}
        />
        <volumeRenderShader
          key={VolumeRenderShader.key}
          uData={texture}
          uSize={[volume.xLength, volume.yLength, volume.zLength]}
          uClim={[0, 0.5]}
          uCmdata={viridis}
          // side={THREE.BackSide}
        />
      </mesh>
      <OrbitControls
        minZoom={0.5}
        maxZoom={4}
        enablePan={false}
        target={[64, 64, 128]}
      />
    </>
  )
}

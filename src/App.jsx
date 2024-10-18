import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Perf } from "r3f-perf"
import { useGLTF, Sparkles, Float, useAnimations } from "@react-three/drei"
import * as THREE from 'three'
import { gsap } from "gsap/gsap-core"
import Interface from "@/Interface.jsx"
import useGame from "@/stores/useGame.jsx"
import GGL from "@/assets/model/GGL.glb"
import models from "@/assets/model/model.glb"

function Rig({children})
{
    const onMenu = useGame((state) => state.onMenu)
    const ref = useRef()
    useFrame((state) => 
    {
        if(onMenu)
        {
            gsap.to(ref.current.rotation, {x:0,y:0, duration:.5})
        }
        else
        {
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 40, 0.05)
            ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 40, 0.05)
        }
    })
    return <group ref={ref}>{children}</group>
}

export function App()
{
    const domContent = useRef()

    return <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
            }}
        >
            {/* <Perf position='top-left' /> */}
            <color args={ [ '#5ff' ] } attach='background' />
            <ambientLight intensity={5} />
            <pointLight 
                color={'#d4d5b2'}
                intensity={80}
                distance={15}
                decay={1.0}
                position={[ 0, 10, 0 ]}
            />
            <Contents />
        </Canvas>
        <Interface />
    </>
}

function Contents()
{
    const setNav = useGame((state) => state.setNav)
    const nav = useGame((state) => state.nav)
    const setCur = useGame((state) => state.setCur)
    const setMenu = useGame((state) => state.setMenu)

    const fieldRef = useRef()
    const ggfRef = useRef()
    const infoRef = useRef()
    const rrRef = useRef()
    const saunaRef = useRef()
    const supRef = useRef()
    const tanneRef = useRef()
    const busRef = useRef()
    const ghostMesh = useRef()
    const groupRef = useRef()
    // const circleRef = useRef()
    const sparkRef = useRef()
    const cloudRef = useRef()
    const modelRef = useRef()
    const { camera } = useThree()
    const busStart = useRef(false)
    const firstUpdate = useRef(true)

    const [busPos, setBusPos] = useState()

    const positionVec = new THREE.Vector3()
    const lookVec = new THREE.Vector3()
    
    
    const cursor = document.querySelector('.inner-cursor')
    const navBx = document.querySelector('.nav_box')
    const navTitle = document.querySelector('.nav_titleBx')

    const plGeo = new THREE.CircleGeometry(.5,16)
    const plMat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0,
    })

    const { nodes } = useGLTF(GGL)
    const cloudMat = new THREE.MeshStandardMaterial({
        color: '#ccc',
        transparent: true,
        opacity: 0.8,
    })
    nodes.bus.children.forEach((mesh)=>
    {
        mesh.visible=false
    })
    var busStop
    var actArr = []

    const model = useGLTF(models)
    const { actions, mixer } = useAnimations(model.animations, modelRef)


    function cursorGrow()
    {
        cursor.classList.add('grow')
    }
    function cursorDecline()
    {
        cursor.classList.remove('grow')
    }
    function clicked(target)
    {
        if(nav == 'none')
        {
            setMenu(true)
            cursorDecline()
            setNav(target)
            navBx.classList.add('active')
            navTitle.classList.add('start')
            setTimeout(() =>
            {
                navTitle.classList.remove('start')
            }, 1000)
        }
    }

    useEffect(() =>
    {
        if(firstUpdate.current)
        {
            nodes.cloud_back.material = cloudMat
            nodes.cloud1.material = cloudMat
            nodes.cloud2.material = cloudMat
            nodes.cloud3.material = cloudMat
            nodes.cloud4.material = cloudMat
            setBusPos(nodes.bus.position.x)
            busStop = 0
            firstUpdate.current = false
        }
        else
        {
            cameraSet()
        }
        return () => 
        {
            mixer.stopAllAction()
        }
    },[nav])
    window.addEventListener('resize', cameraSet())
    function modelAction(act)
    {
        act.forEach((act) =>
        {
            actions[act]
                .reset()
                .setLoop(THREE.LoopRepeat)
                .play()
        })
    }

    function cameraSet()
    {
        if(nav=='none')
        {
            positionVec.set(-0.13, 7.8, 11.32)
            lookVec.set(0,0,0)
            busStart.current = false
            if(!firstUpdate.current)
            {
                modelRef.current.scale.set(2.5,2.5,2.5)
                modelRef.current.position.set(1,0.1,0)
                modelRef.current.rotation.set(0,0,0)
                modelRef.current.children.forEach((group) =>
                {
                    if(group.name != 'model')
                        group.visible = false
                })
                actArr = ["def", "def_face"]
                modelAction(actArr)
                
            }
        }
        else if(nav=='field')
        {
            positionVec.set(fieldRef.current.position.x + .3, fieldRef.current.position.y + 1.2, fieldRef.current.position.z + 3)
            lookVec.set(fieldRef.current.position.x+.1 + .5 * (window.innerWidth / 1920), fieldRef.current.position.y, fieldRef.current.position.z)
            modelRef.current.scale.set(1.1,1.1,1.1)
            modelRef.current.position.set(fieldRef.current.position.x -.43, fieldRef.current.position.y + .1, fieldRef.current.position.z -.1)
            modelRef.current.children[2].visible = true
            actArr = ["farm", "farm_face", "farm_kuwa"]
            modelAction(actArr)
        }
        else if(nav=='ggf')
        {
            positionVec.set(ggfRef.current.position.x+.7, ggfRef.current.position.y + 1, ggfRef.current.position.z + 2.5)
            lookVec.set(ggfRef.current.position.x + .2  + .5 * (window.innerWidth / 1920), ggfRef.current.position.y + .2, ggfRef.current.position.z)
            modelRef.current.scale.set(1.1,1.1,1.1)
            modelRef.current.position.set(ggfRef.current.position.x -.15, ggfRef.current.position.y, ggfRef.current.position.z + .8)
            modelRef.current.rotation.set(0,.3,0)
            modelRef.current.children[1].visible = true
            actArr = ["ggf", "ggf_face", "ggf_cap"]
            modelAction(actArr)

        }
        else if(nav=='info')
        {
            positionVec.set(infoRef.current.position.x + .3 , infoRef.current.position.y + .8, infoRef.current.position.z + 2.8)
            lookVec.set(infoRef.current.position.x+ .2 + .5 * (window.innerWidth / 1920), infoRef.current.position.y + .2, infoRef.current.position.z)
            busRef.current.children.forEach((mesh)=>
            {
                mesh.visible = true
            })
            busRef.current.rotation.y = 0
            busRef.current.position.x = busPos
            busStop = 0
            modelRef.current.scale.set(1.1,1.1,1.1)
            modelRef.current.position.set(infoRef.current.position.x, infoRef.current.position.y, infoRef.current.position.z)
            actArr=["info", "info_face"]
            modelAction(actArr)
            
        }
        else if(nav=='rr')
        {
            positionVec.set(rrRef.current.position.x - 1, rrRef.current.position.y + 1.5, rrRef.current.position.z + 2)
            lookVec.set(rrRef.current.position.x + .5 * (window.innerWidth / 1920), rrRef.current.position.y, rrRef.current.position.z+.3)
            modelRef.current.scale.set(1,1,1)
            modelRef.current.position.set(rrRef.current.position.x-.1, rrRef.current.position.y-.12, rrRef.current.position.z + .1)
            modelRef.current.rotation.set(0,-.58,0)
            modelRef.current.children[5].visible = true
            actArr=["rr", "rr_face", "rr_boad"]
            modelAction(actArr)
        }
        else if(nav=='sauna')
        {
            positionVec.set(saunaRef.current.position.x - 1, saunaRef.current.position.y + 1, saunaRef.current.position.z + 3)
            lookVec.set(saunaRef.current.position.x + .5 + .5 * (window.innerWidth / 1920), saunaRef.current.position.y, saunaRef.current.position.z)
            modelRef.current.scale.set(1.3,1.3,1.3)
            modelRef.current.position.set(saunaRef.current.position.x - .3, saunaRef.current.position.y, saunaRef.current.position.z + 1)
            modelRef.current.rotation.set(0, -.45, 0)
            modelRef.current.children[3].visible = true
            actArr=["sauna", "sauna_face", "sauna_oke"]
            modelAction(actArr)

        }
        else if(nav=='sup')
        {
            positionVec.set(supRef.current.position.x, supRef.current.position.y + 1.5, supRef.current.position.z + 4)
            lookVec.set(supRef.current.position.x + .5 + .5 * (window.innerWidth / 1920), supRef.current.position.y, supRef.current.position.z)
            modelRef.current.scale.set(1.5,1.5,1.5)
            modelRef.current.position.set(supRef.current.position.x + .5, supRef.current.position.y+.1, supRef.current.position.z + 1.6)
            modelRef.current.rotation.set(0, .1, 0)
            modelRef.current.children[4].visible = true
            actArr=["sup", "sup_face", "sup_boat", "sup_pad"]
            modelAction(actArr)
        }
        else if(nav=='tanne')
        {
            positionVec.set(tanneRef.current.position.x, tanneRef.current.position.y + 2, tanneRef.current.position.z + 4.5)
            lookVec.set(tanneRef.current.position.x + .2 + .5 * (window.innerWidth / 1920), tanneRef.current.position.y + .5, tanneRef.current.position.z)
            modelRef.current.scale.set(1.8,1.8,1.8)
            modelRef.current.position.set(tanneRef.current.position.x-.3, tanneRef.current.position.y, tanneRef.current.position.z+ .9)
            modelRef.current.rotation.set(0,.2,0)
            modelRef.current.children[6].visible = true
            actArr=["tanne", "tanne_face", "tanne_camera"]
            modelAction(actArr)
        }
    }

    useFrame((state, delta) =>
    {
        const step = .05
        const et = state.clock.elapsedTime
        camera.position.lerp(positionVec, step)
        ghostMesh.current.position.lerp(lookVec, step)
        camera.lookAt(
            ghostMesh.current.position.x,
            ghostMesh.current.position.y,
            ghostMesh.current.position.z
        )
        ghostMesh.current.updateMatrix()
        camera.updateProjectionMatrix()
        groupRef.current.rotation.y += delta * .3
        groupRef.current.scale.set(.7 + Math.abs(Math.sin(et)),.7 + Math.abs(Math.sin(et)),.7 + Math.abs(Math.sin(et)))
        cloudRef.current.children.forEach((mesh)=>
        {
            (mesh.position.x < -13) ? mesh.position.x = 13 : mesh.position.x -= delta * mesh.speed
            mesh.position.y = mesh.position.y + Math.sin(et * mesh.span) * .002 * mesh.height
        })
        if(nav=='info')
        {
            if(busRef.current.rotation.y < 1.55)
                busRef.current.rotation.y += delta * .3
            else if(busStop < 2)
            {
                busStop += delta
            }
            else if(busRef.current.position.x < 5)
                busRef.current.position.x += delta
            else
            {
                busRef.current.rotation.y = 0
                busRef.current.position.x = busPos
                busStop = 0
            }
        }
    })


    return <>
        <mesh ref={ghostMesh} position={[0,0,0]}>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial wireframe transparent opacity={0} />
        </mesh>
        <Rig>
            <primitive object={nodes.other} />
            <primitive ref={modelRef} object={model.scene} />
            <mesh
                ref={fieldRef} 
                geometry={plGeo}
                material={plMat}
                position={[-3.2, 0.373, -1.364]} 
                rotateX={1.57}
                scale={[3,3,1]} 
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('field'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('field'))}
            />

            <mesh
                ref={ggfRef}
                geometry={plGeo}
                material={plMat}
                position={[3.149, 0, 2.577]}
                scale={[3,3,1]} 
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('ggf'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('ggf'))}
            />
            <mesh
                ref={infoRef}
                geometry={plGeo}
                material={plMat}
                position={[-0.973, 0.014, 0.234]}
                scale={[3,3,1]}
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('info'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('info'))}
            />
            <mesh
                ref={rrRef}
                geometry={plGeo}
                material={plMat}
                position={[-0.513, 0, 2.505]}
                scale={[2.2,2.2,1]}
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('rr'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('rr'))}
            />
            <mesh
                ref={saunaRef}
                geometry={plGeo}
                material={plMat}
                position={[3.658, 0.659, -1.274]}
                scale={[3.5,3.5,1]}
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('sauna'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('sauna'))}
            />
            <mesh
                ref={supRef}
                geometry={plGeo}
                material={plMat}
                position={[-4.095, -0.417, 5.5]}
                scale={[5,4,1]}
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('sup'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('sup'))}
            />
            <mesh
                ref={tanneRef}
                geometry={plGeo}
                material={plMat}
                position={[2.054, 1.555, -6]}
                scale={[5,5,1]}
                onPointerEnter={(e)=>(e.stopPropagation(), cursorGrow(), setCur('tanne'))}
                onPointerLeave={()=> (cursorDecline(), setCur('none'))}
                onClick={(e)=>(e.stopPropagation(), clicked('tanne'))}
            />
            <primitive
                ref={busRef}
                object={nodes.bus}
            />
            <group ref={groupRef} visible={false}>
                <Float rotationIntensity={.5}>
                    <Sparkles
                        ref={sparkRef}
                        count={50}
                        speed={.5}
                        color={'#cccc00'}
                        size={10}
                        scale={2}
                        noise={[.5,1,.5]}
                        positionY={.75}
                    />
                </Float>
                {/* <mesh ref={circleRef} visible rotation={[1.57, 0,0]} >
                    <torusGeometry attach='geometry' args={[.8, .05, 16, 50]} />
                    <meshStandardMaterial attach='material' color={'#cccc00'} depthTest={false} transparent opacity={0} />
                </mesh> */}
            </group>
            <primitive object={nodes.cloud_back} />
            <group ref={cloudRef}>
                <primitive object={nodes.cloud1} speed={.3} height={1} span={1} />
                <primitive object={nodes.cloud2} speed={.2} height={1.2} span={1.2} />
                <primitive object={nodes.cloud3} speed={.4} height={0.9} span={0.8} />
                <primitive object={nodes.cloud4} speed={.2} height={1.1} span={1.1} />
            </group>
        </Rig>
    </>
}
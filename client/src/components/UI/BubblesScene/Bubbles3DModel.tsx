import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, MeshStandardMaterial } from "three";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    top: Mesh;
    bot: Mesh;
  };
  materials: {
    top: MeshStandardMaterial;
    bot: MeshStandardMaterial;
  };
};

export function Bubbles3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/assets/models/Bubbles.gltf"
  ) as GLTFResult;
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsedTime = clock.getElapsedTime();

    // Use gsap to animate the rotation with easing
    gsap.to(groupRef.current.rotation, {
      y: elapsedTime * 0.05, // Adjust the rotation speed as needed
      ease: "power2.out", // Easing function (e.g., "power2.inOut", "elastic.out", "back.out", etc.)
    });
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.top.geometry}
        material={materials.top}
        position={[1.2, 3.5, 0.51]}
      />
      <mesh
        geometry={nodes.bot.geometry}
        material={materials.bot}
        position={[-1, 1.5, -0.49]}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/Bubbles.gltf");

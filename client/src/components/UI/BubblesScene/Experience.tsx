// import { OrbitControls, OrthographicCamera } from "@react-three/drei";
// import { Perf } from "r3f-perf";
// import Lights from "./Lights.jsx";
import { useControls } from "leva";
import { Suspense } from "react";
import { Bubbles3DModel } from "./Bubbles3DModel";

const Experience = () => {
  const { x, y, z } = useControls("Debug", {
    x: { value: 1.5, min: -10, max: 10, step: 0.1 },
    y: { value: -2.5, min: -10, max: 10, step: 0.1 },
    z: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  return (
    <>
      <Suspense>
        <directionalLight
          castShadow
          position={[0, 4, 4]}
          intensity={1}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-left={-10}
        />
        <directionalLight
          castShadow
          position={[0, -4, -4]}
          intensity={0.1}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-left={-10}
        />
        <ambientLight intensity={0.01} />
        <Bubbles3DModel position={[x, y, z]} rotation={[0, Math.PI / 2, 0]} />
      </Suspense>
    </>
  );
};

// fallback={<Loading />}

export default Experience;

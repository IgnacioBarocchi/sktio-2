import { Camera, OrthographicCamera, PerspectiveCamera } from "three";
import { Canvas, ReactThreeFiber } from "@react-three/fiber";
import Experience from "./Experience";
type CameraOptions = (
  | Camera
  | Partial<
      ReactThreeFiber.Object3DNode<Camera, typeof Camera> &
        ReactThreeFiber.Object3DNode<
          PerspectiveCamera,
          typeof PerspectiveCamera
        > &
        ReactThreeFiber.Object3DNode<
          OrthographicCamera,
          typeof OrthographicCamera
        >
    >
) & {
  manual?: boolean;
};

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [0, 0, -8],
};

const debugOptions = {
  test: {
    orbitControls: true,
    debugValue: true,
    lights: true,
    ortho: false,
    perf: true,
    level: { value: 0, min: 0, max: 3, step: 1 },
  },
  prod: {
    orbitControls: false,
    debugValue: false,
    lights: false,
    ortho: false,
    perf: false,
    level: 0,
  },
};

export type DebugOptions = typeof debugOptions;
const BubblesScene = () => {
  return (
    <Canvas shadows camera={camera}>
      <Experience />
    </Canvas>
  );
};

export default BubblesScene;

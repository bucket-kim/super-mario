import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import { Controls } from "../../Controls/Controls";

const MOVEMENT_SPEED = 5;
const JUMP_FORCE = 10;

const Character = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  const inTheAirRef = useRef(false);

  const [, get] = useKeyboardControls();

  const velocity = new THREE.Vector3();

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    velocity.x = 0;
    velocity.y = 0;
    velocity.z = 0;

    const currentVelocity = rigidBodyRef.current.linvel();

    if (get()[Controls.forward]) {
      velocity.z -= MOVEMENT_SPEED;
    }
    if (get()[Controls.back]) {
      velocity.z += MOVEMENT_SPEED;
    }
    if (get()[Controls.left]) {
      velocity.x -= MOVEMENT_SPEED;
    }
    if (get()[Controls.right]) {
      velocity.x += MOVEMENT_SPEED;
    }
    if (get()[Controls.jump] && !inTheAirRef.current) {
      velocity.y += JUMP_FORCE;
      inTheAirRef.current = true;
    } else {
      velocity.y = currentVelocity.y;
    }

    rigidBodyRef.current.setLinvel(velocity, true);
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        lockRotations
        gravityScale={2.5}
        onCollisionEnter={({ other }) => {
          if (!other.rigidBodyObject) return;
          if (other.rigidBodyObject.name === "ground") {
            inTheAirRef.current = false;
          }
        }}
      >
        <mesh castShadow receiveShadow scale={0.5} position={[-3, 1, 2.8]}>
          <sphereGeometry />
          <meshStandardMaterial color={"#ffffff"} />
        </mesh>
      </RigidBody>
    </group>
  );
};

export default Character;

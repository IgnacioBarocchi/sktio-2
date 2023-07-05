import { motion, useMotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

export const MotionWrapper = styled.div`
  width: 100%;
  perspective: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MotionContainer = styled(motion.div)`
  margin: 0 auto;
  min-width: calc(100vw - 10rem);
  height: calc(100vh - 1rem);
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  color: black;
  position: relative;
  cursor: grab;
`;

export const MotionPannel = ({
  // @ts-ignore
  children,
  zValue = 100,
  dragElastic = 0.16,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  return (
    <MotionWrapper>
      <MotionContainer
        style={{ x, y, rotateX, rotateY, z: zValue }}
        drag
        dragElastic={dragElastic}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {children}
      </MotionContainer>
    </MotionWrapper>
  );
};

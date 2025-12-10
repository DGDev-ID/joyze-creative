"use client";

import React from "react";
import { motion } from "framer-motion";

type MotionDivProps = React.ComponentProps<typeof motion.div> & { children?: React.ReactNode };
type MotionImgProps = React.ComponentProps<typeof motion.img>;

export const MotionDiv: React.FC<MotionDivProps> = ({ children, ...props }) => {
  return <motion.div {...(props as MotionDivProps)}>{children}</motion.div>;
};

export const MotionImg: React.FC<MotionImgProps> = (props) => {
  return <motion.img {...(props as MotionImgProps)} />;
};

export default MotionDiv;

"use client";

import React from "react";
import { motion } from "framer-motion";

export const MotionDiv: React.FC<any> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};

export const MotionImg: React.FC<any> = (props) => {
  return <motion.img {...props} />;
};

export default MotionDiv;

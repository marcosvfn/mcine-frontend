"use client";

import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { ComponentProps, useEffect, useRef, useState } from "react";

interface AnimateH5Props extends ComponentProps<"h5"> {
  direction: "vertical" | "horizontal";
}

export const verticalVariants: Variants = {
  initial: {
    opacity: 0,
    y: 200,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const horizontalVariants: Variants = {
  initial: {
    opacity: 0,
    x: -300,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export default function AnimateH5(props: AnimateH5Props) {
  const { children, direction, className } = props;
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    }
  }, [isInView, mainControls]);

  const animateVariant =
    direction === "vertical" ? verticalVariants : horizontalVariants;

  return (
    <motion.h5
      ref={ref}
      initial="initial"
      variants={animateVariant}
      animate={mainControls}
      className={className}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.h5>
  );
}

"use client";

import { Variants, motion, useAnimation, useInView } from "framer-motion";
import { ComponentProps, useEffect, useRef } from "react";

interface AnimateH5Props extends ComponentProps<"div"> {
  direction?: "vertical" | "horizontal";
  duration?: number;
  delay?: number;
  variants?: Variants;
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
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
};

export default function AnimateDiv(props: AnimateH5Props) {
  const { children, direction, duration, delay, variants, className, onClick } =
    props;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Dispara animação com base no scroll atingir o componente
      mainControls.start("animate");
    }
  }, [isInView, mainControls]);

  const animateVariant =
    direction === "vertical" ? verticalVariants : horizontalVariants;

  return (
    <motion.div
      initial="initial"
      variants={variants || animateVariant}
      animate={mainControls}
      className={className}
      transition={{ duration: duration || 2, delay: delay || 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

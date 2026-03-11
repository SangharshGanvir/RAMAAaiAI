export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4 }
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
};

export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export const starBurst = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [0, 180, 360],
    transition: { duration: 0.6 }
  }
};

export const confettiAnimation = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: [0, 100, 200],
    opacity: [0, 1, 0],
    x: [-50, 0, 50],
    rotate: [0, 360, 720],
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
};

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const buttonTap = {
  scale: 0.95
};

export const characterBounce = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(238, 91, 43, 0)",
      "0 0 0 10px rgba(238, 91, 43, 0.3)",
      "0 0 0 20px rgba(238, 91, 43, 0)"
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity
    }
  }
};

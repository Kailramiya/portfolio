import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// A card that tilts in 3D toward the pointer. Pure perspective transform —
// no WebGL. Auto-disables on touch devices and for prefers-reduced-motion,
// where it falls back to a plain motion.div with the same entrance props.
export default function TiltCard({ children, className, max = 9, style, ...props }) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setEnabled(!reduced && !coarse);
  }, []);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 });

  const handleMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        enabled
          ? { rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d', ...style }
          : style
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

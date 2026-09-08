import { motion } from 'framer-motion';

// Shared fade-in-up-on-scroll wrapper used throughout the site — fires once
// when ~15% of the element enters the viewport, eases out so the motion
// settles rather than snapping. `delay` staggers sibling reveals (e.g. a
// grid of cards) without each one needing its own transition config.
export function ScrollReveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container — wrap a set of ScrollRevealItem children to have them
// cascade in one after another instead of all firing at once.
export function StaggerGroup({ children, className, staggerDelay = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 20 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

import { motion } from "framer-motion";

const animations = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  exit: { scale: 30 },
};

const InflateAnimate = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{duration: 2}}
    >
      {children}
    </motion.div>
  );
};

export default InflateAnimate;

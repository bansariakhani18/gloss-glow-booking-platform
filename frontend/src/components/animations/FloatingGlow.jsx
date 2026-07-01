import { motion } from "motion/react";

export default function FloatingGlow() {
    return (
        <motion.div
            animate={{
                x: [0, 40, -20, 0],
                y: [0, -30, 20, 0],
            }}
            transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="
                absolute
                w-[450px]
                h-[450px]
                rounded-full
                bg-red-600/20
                blur-[140px]
                -z-10
            "
        />
    );
}
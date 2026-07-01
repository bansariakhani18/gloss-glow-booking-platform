import { motion } from "motion/react";

export default function Button({ children }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-red-600 text-white font-semibold shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all duration-300"
        >
            {children}
        </motion.button>
    );
}
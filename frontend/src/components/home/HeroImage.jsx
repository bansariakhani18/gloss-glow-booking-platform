import { motion } from "motion/react";
import heroCar from "../../assets/images/hero-car.png";

export default function HeroImage() {

    return (

        <motion.div

            initial={{ opacity: 0, x: 80 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 1 }}

            className="flex justify-center"

        >

            <img

                src={heroCar}

                alt="Hero Car"

                className="w-[700px] h-[700px] object-cover rounded-3xl"

            />

        </motion.div>

    );

}
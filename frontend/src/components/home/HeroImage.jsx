import { motion } from "motion/react";
import heroCar from "../../assets/hero/hero-car.png";
export default function HeroImage() {

    return (

        <motion.div

            initial={{ opacity: 0, x: 80 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 1 }}

           className="flex justify-center mt-8 lg:mt-0"

        >

            <img

                src={heroCar}

                alt="Hero Car"

                className="
                    w-full
max-w-[340px]
sm:max-w-[450px]
lg:max-w-[700px]
aspect-square
object-cover
rounded-3xl
"
            />

        </motion.div>

    );

}
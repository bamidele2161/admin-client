import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BrandIcon, BrandMobileIcon } from "../assets/svg/Product";

const HomePage = () => {
  const navigate = useNavigate();

  const text = "Welcome to ashoBox Elevate Your Fashion Business";

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel - Fashion Branding */}
      <section className="bg-gradient-to-br from-secColor-Light via-[#f0f4fb] to-[#FFFFFF] w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-between relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <BrandIcon className="lg:h-10 md:h-8 w-auto hidden md:block" />

          <BrandMobileIcon className="h-8 w-auto md:hidden" />
          <h1 className="font-bold text-xl text-pryColor hidden md:block">
            ashoBox
          </h1>
        </motion.div>

        <div className="my-8 lg:my-0">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-pryColor font-semibold text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="text-gray-600 text-sm lg:text-base leading-relaxed md:pr-20"
          >
            {/* Join the ultimate fashion marketplace! ashoBox empowers vendors to
            showcase their styles, reach more customers, and grow their brand.
            <br />
            <br /> */}
            Seamlessly manage your store, track sales, and deliver fashion at
            its finest.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <p className="text-gray-500 text-sm mb-2">
            Trusted by fashion entrepreneurs across the industry.
          </p>
          <p className="text-gray-500 text-sm">
            Your go-to platform for selling, scaling, and succeeding in fashion.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-[15%] right-[10%] w-16 h-16 rounded-full bg-purple-100 opacity-40 blur-lg"></div>
        <div className="absolute bottom-[20%] left-[5%] w-24 h-24 rounded-full bg-purple-200 opacity-30 blur-lg"></div>
      </section>

      {/* Right Panel - Signup Form */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-full lg:w-1/2 bg-white px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex items-center"
      >
        <div className="flex justify-center md:flex-col flex-row w-full gap-3">
          <button
            className="px-8 py-4 text-white bg-pryColor rounded-xl w-full text-sm sm:text-base"
            type="submit"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>

          <button
            className="px-8 py-4 text-white bg-secColor rounded-xl  w-full text-sm sm:text-base"
            type="submit"
            // onClick={() => handleAccountStatus(false)}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>{" "}
      </motion.section>
    </main>
  );
};

export default HomePage;

import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../service/auth";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { useCookies } from "../../../hooks/cookiesHook";
import { motion } from "framer-motion";

const VendorSignin = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { setCookies } = useCookies();
  const initialValues = {
    password: "",
    emailOrPhoneNumber: "",
  };

  const onSubmit = async (formData: {
    password: string;
    emailOrPhoneNumber: string;
  }) => {
    const requiredData = {
      password: formData.password,
      emailOrPhoneNumber: formData.emailOrPhoneNumber.toLowerCase().trim(),
    };
    const response = await login(requiredData).unwrap();
    console.log("Vendor Login", response);
    if (response?.error) {
      toast.error(response?.message);
    } else {
      if (response?.data?.role === "VENDOR") {
        dispatch(saveUserInfo(response?.data));
        setCookies("ashoboxToken", response?.data?.access_token);
        toast.success(response?.message);
        navigate("/dashboard");
      } else {
        toast.error("You are not authorized as a Vendor!");
      }
    }
  };

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    emailOrPhoneNumber: Yup.string().required(
      "Email or Phone number is required"
    ),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

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
            className="text-gray-600 text-sm lg:text-base leading-relaxed  md:pr-20"
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
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-full lg:w-1/2 bg-white px-6 lg:px-12 xl:px-20 py-8 lg:py-0 flex items-center"
      >
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#1A1F2C] mb-3">
              Login
            </h1>
            <p className="text-gray-500 text-sm lg:text-base">Welcome Back!</p>
          </div>
          <form
            className="flex flex-col gap-4 w-full mt-6"
            onSubmit={handleSubmit}
          >
            <FormInput
              placeholder="Email or phone number"
              type="text"
              id={"emailOrPhoneNumber"}
              name="emailOrPhoneNumber"
              error={
                touched.emailOrPhoneNumber
                  ? errors.emailOrPhoneNumber
                  : undefined
              }
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.emailOrPhoneNumber}
            />
            <FormInput
              placeholder="password"
              type="password"
              id={"password"}
              name="password"
              error={touched.password ? errors.password : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.password}
            />
            <button
              className="w-full bg-pryColor text-white py-3 mt-4 rounded-lg hover:bg-pryColor"
              type="submit"
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-pryColor cursor-pointer hover:font-semibold"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default VendorSignin;

import Spinner from "../../../components/Spinner/Spinner";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRegisterVendorMutation } from "../../../service/auth";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { useCookies } from "../../../hooks/cookiesHook";
import { motion } from "framer-motion";

const VendorSignup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setCookies } = useCookies();
  const [registerVendor, { isLoading }] = useRegisterVendorMutation();

  const initialValues = {
    fullName: "",
    businessName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      const response = await registerVendor(formData).unwrap();
      // console.log("vendor signup", response);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        dispatch(saveUserInfo(response?.data));
        setCookies("ashoboxToken", response?.data?.access_token);
        toast.success(response?.message);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("First name is required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
    businessName: Yup.string().required("Business name is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
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
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-[#1A1F2C] mb-3">
              Create Vendor Account
            </h1>
            <p className="text-gray-500 text-sm lg:text-base">
              Join us to showcase your fashion collection and reach thousands of
              fashion enthusiasts.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                error={touched.fullName ? errors.fullName : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.fullName}
              />
              <FormInput
                placeholder="Business Name"
                type="text"
                id="businessName"
                name="businessName"
                error={
                  touched.businessName
                    ? (errors.businessName as string)
                    : undefined
                }
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.businessName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                error={
                  touched.password ? (errors.password as string) : undefined
                }
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.password}
              />

              <FormInput
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                defaultValue={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.phoneNumber
                    ? (errors.phoneNumber as string)
                    : undefined
                }
                onlyCountries={["ng"]}
                defaultCountry="ng"
                telValue={values?.phoneNumber?.toString()}
                className=""
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                placeholder="Email address"
                type="email"
                id="email"
                name="email"
                error={touched.email ? (errors.email as string) : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.email}
              />

              <FormInput
                placeholder="City"
                type="text"
                id="city"
                name="city"
                error={touched.city ? (errors.city as string) : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.city}
              />
            </div>
            <FormInput
              placeholder="Business Address"
              type="textarea"
              id="address"
              name="address"
              error={touched.address ? (errors.address as string) : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.address}
            />

            <button
              type="submit"
              className="w-full bg-pryColor hover:bg-pryColor text-white py-3.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {isLoading ? <Spinner /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                className="text-pryColor font-medium cursor-pointer hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default VendorSignup;

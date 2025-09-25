import { useLoginMutation } from "../../../service/auth";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { useAppDispatch } from "../../../hooks";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { BrandIcon, BrandMobileIcon } from "../../../assets/svg/Product";
import { useNavigate } from "react-router-dom";
import { useCookies } from "../../../hooks/cookiesHook";
const AdminAuth = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { setCookies } = useCookies();
  const initialValues = {
    emailOrPhoneNumber: "",
    password: "",
  };

  const onSubmit = async (formData: {
    password: string;
    emailOrPhoneNumber: string;
  }) => {
    try {
      const requiredData = {
        password: formData.password,
        emailOrPhoneNumber: formData.emailOrPhoneNumber.toLowerCase().trim(),
      };
      const response = await login(requiredData).unwrap();
      console.log("Shopper Login", response);
      if (response?.error) {
        toast.error(response?.message);
      } else {
        console.log(response);

        if (response?.data?.role === "ADMIN") {
          dispatch(saveUserInfo(response?.data));
          setCookies("ashoboxToken", response?.data?.access_token);
          toast.success(response?.message);
          navigate("/admin-dashboard");
        } else {
          toast.error("You are not authorized as an Admin!");
        }
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    emailOrPhoneNumber: Yup.string().required("Email is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  // Exchange the code for user info

  return (
    <div className="bg-gradient-to-br from-secColor-Light via-[#f0f4fb] to-[#FFFFFF] py-20 h-screen flex flex-col gap-24">
      <div className="flex items-center gap-3 justify-center">
        <BrandIcon className="lg:h-10 md:h-8 w-auto hidden md:block" />

        <BrandMobileIcon className="h-8 w-auto md:hidden" />
        <h1 className="font-bold text-xl text-pryColor hidden md:block">
          ashoBox
        </h1>
      </div>

      <section className="justify-center flex items-center md:px-0 px-12 border-3">
        <div className="flex flex-col gap-6 bg-white md:p-12 p-8 rounded-lg shadow-sm justify-center items-center border">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center pb-4 w-full">
              <h1 className="text-2xl md:text-3xl font-semibold">Login</h1>
            </div>

            <p className="mb-6 md:text-base text-sm md:w-[400px] w-[300px]">
              Welcome back Admin!
              <br /> Log in to access your account.
            </p>

            <form
              className="flex flex-col gap-4 w-full"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAuth;

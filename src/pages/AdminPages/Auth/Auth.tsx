import { useLoginMutation } from "../../../service/auth";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { useAppDispatch } from "../../../hooks";
import { saveUserInfo } from "../../../store/slice/authSlice";
import { BrandIcon } from "../../../assets/svg/Product";
import { HiOutlineArrowRight, HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";
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
    <main className="min-h-screen bg-[#ECE9E1] p-3 sm:p-5 lg:p-7">
      <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1500px] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(21,26,34,.10)] sm:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[1.08fr_.92fr]">
        <div className="relative hidden overflow-hidden bg-pryColor p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10" />
          <div className="absolute -bottom-32 left-20 h-80 w-80 rounded-full bg-[#6F8294]/30 blur-3xl" />
          <div className="relative flex items-center gap-3"><BrandIcon className="h-9 w-auto brightness-0 invert" /><div><p className="font-spaceGrotesk text-xl font-semibold">ashobox</p><p className="text-[9px] font-bold uppercase tracking-[.24em] text-white/45">Admin studio</p></div></div>
          <div className="relative max-w-xl">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[.22em] text-white/50">Marketplace control centre</p>
            <h1 className="font-spaceGrotesk text-6xl font-semibold leading-[.98] tracking-[-.05em]">Fashion commerce,<br/>beautifully managed.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/60">One calm workspace for products, orders, vendors, customers, payouts, and the decisions that move Ashobox forward.</p>
          </div>
          <div className="relative flex gap-6 text-xs font-medium text-white/55"><span className="flex items-center gap-2"><HiOutlineShieldCheck size={16}/> Secure access</span><span className="flex items-center gap-2"><HiOutlineLockClosed size={16}/> Admin only</span></div>
        </div>

        <div className="flex items-center justify-center bg-[#F8F7F3] px-6 py-12 sm:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <div className="mb-14 flex items-center gap-3 lg:hidden"><BrandIcon className="h-8 w-auto" /><div><p className="font-spaceGrotesk text-xl font-semibold">ashobox</p><p className="text-[9px] font-bold uppercase tracking-[.22em] text-lightGreyColor">Admin studio</p></div></div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-lightGreyColor">Welcome back</p>
            <h2 className="mt-3 font-spaceGrotesk text-4xl font-semibold tracking-[-.04em] text-pryColor sm:text-5xl">Sign in to<br/>your workspace.</h2>
            <p className="mb-9 mt-4 text-sm leading-6 text-lightGreyColor">Use your administrator credentials to continue.</p>

            <form
              className="flex w-full flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <label className="text-xs font-semibold text-pryColor">Email or phone number</label>
              <FormInput
                placeholder="admin@ashobox.com"
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
              <label className="mt-1 text-xs font-semibold text-pryColor">Password</label>
              <FormInput
                placeholder="Enter your password"
                type="password"
                id={"password"}
                name="password"
                error={touched.password ? errors.password : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.password}
              />
              <button
                className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-pryColor px-6 py-3 font-semibold text-white transition hover:bg-[#242B35]"
                type="submit"
              >
                {isLoading ? <Spinner /> : <>Sign in securely <HiOutlineArrowRight size={18}/></>}
              </button>
            </form>
            <p className="mt-8 text-center text-xs leading-5 text-lightGreyColor">Access is monitored and limited to authorised Ashobox team members.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminAuth;

import { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import FormInput from "../../../components/FormInput";

type ResetStep = "SEND_OTP" | "VERIFY_OTP" | "RESET_PASSWORD";

const ResetStep = {
  SEND_OTP: "SEND_OTP",
  VERIFY_OTP: "VERIFY_OTP",
  RESET_PASSWORD: "RESET_PASSWORD",
} as const;

const ResetPassword = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const [step, setStep] = useState<ResetStep>(ResetStep.SEND_OTP);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = userInfo?.email;

  const handleSendOtp = () => {
    // Call API to send OTP to email
    console.log("Sending OTP to:", email);
    setStep(ResetStep.VERIFY_OTP);
  };

  const handleVerifyOtp = () => {
    // Call API to verify OTP
    console.log("Verifying OTP:", otp);
    setStep(ResetStep.RESET_PASSWORD);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Call API to reset password
    console.log("Resetting password for:", email);
    console.log("New Password:", newPassword);
    // Reset flow or notify user
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

      <FormInput
        label="Email"
        type="email"
        defaultValue={email}
        disabled
        id={""}
        className="mb-4"
      />

      {step === ResetStep.SEND_OTP && (
        <button
          onClick={handleSendOtp}
          className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors"
        >
          Send OTP
        </button>
      )}

      {step === ResetStep.VERIFY_OTP && (
        <>
          <FormInput
            label="Enter OTP"
            type="text"
            defaultValue={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4"
            id={""}
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors"
          >
            Verify OTP
          </button>
        </>
      )}

      {step === ResetStep.RESET_PASSWORD && (
        <>
          <FormInput
            label="New Password"
            type="password"
            id={""}
            defaultValue={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4"
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            id={""}
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4"
          />
          <button
            type="submit"
            className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;

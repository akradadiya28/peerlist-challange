"use client";

import { useEffect, useRef, useState } from "react";
import { OTPInput } from "@/components/otp-input";
import Image from "next/image";

export default function Home() {
  const [otpValue, setOtpValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendIn, setResendIn] = useState(30); // start at 30s
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const validateOTP = (otp: string) => otp === "1234";

  // Runs when user finishes typing all digits in OTPInput
  const handleOTPComplete = (otp: string) => {
    setOtpValue(otp);
    const ok = validateOTP(otp);
    setIsVerified(ok); // only true for correct OTP
    // If verified, stop any running resend timer
    if (ok && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setResendIn(0); // enable resend immediately (optional)
    }
  };

  // Start or continue countdown; safe cleanup on unmount and on restart
  useEffect(() => {
    if (resendIn <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(() => {
      setResendIn((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resendIn]);

  // Resend: restart cooldown and reset UI state
  const handleResend = () => {
    if (resendIn > 0) return;
    setIsVerified(false);
    setOtpValue("");
    setResendIn(30); // restart 30s cooldown
  };

  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-lg items-center justify-center p-6">
          <div className="w-full rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-8 text-center space-y-6">
            <div className="flex justify-center">
              <Image
                src="/peerlist-logo-full-light.svg"
                alt="Peerlist Logo"
                className="w-45 h-20 object-contain"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Enter Verification Code
              </h1>
              <p className="text-gray-600 text-sm">
                We sent a code to user{" "}
                <span className="text-blue-600 font-medium">
                  support@peerlist.io
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <OTPInput
                key={resendIn === 30 && !otpValue ? "fresh" : "keep"} // helps reset focus on resend start
                length={4}
                onComplete={handleOTPComplete}
                onValidate={validateOTP}
                placeholders={["1", "2", "3", "4"]}
                className="justify-center"
              />

              <button
                onClick={handleResend}
                disabled={resendIn > 0}
                className={`text-sm transition-colors ${
                  resendIn > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Didn’t get a code?{" "}
                <span
                  className={
                    resendIn > 0
                      ? "text-gray-400"
                      : "text-blue-600 hover:underline"
                  }
                >
                  {resendIn > 0 ? `resend in ${resendIn}s` : "click resend"}
                </span>
              </button>
            </div>

            {isVerified && (
              <div className="text-green-600 font-medium">
                ✓ Code verified successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

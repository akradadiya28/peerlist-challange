"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CellVisual = "default" | "active" | "filled" | "success" | "error";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onValidate?: (otp: string) => boolean | Promise<boolean>;
  className?: string;
  placeholders?: string[]; // optional per-cell placeholders
}

export function OTPInput({
  length = 4,
  onComplete,
  onValidate,
  className,
  placeholders,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const [visuals, setVisuals] = useState<CellVisual[]>(
    () => Array(length).fill("default")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Helpers
  const setCell = (i: number, v: string, visual?: CellVisual) => {
    setValues((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (visual) {
      setVisuals((prev) => {
        const next = [...prev];
        next[i] = visual;
        return next;
      });
    }
  };

  const resetAll = () => {
    setValues(Array(length).fill(""));
    setVisuals(Array(length).fill("default"));
    inputRefs.current[0]?.focus();
  };

  const runValidationIfComplete = async (nextValues: string[]) => {
    if (!nextValues.every((v) => v !== "")) return;
    const otp = nextValues.join("");

    if (onValidate) {
      const ok = await onValidate(otp);
      if (ok) {
        setVisuals(Array(length).fill("success"));
        onComplete?.(otp);
      } else {
        setVisuals(Array(length).fill("error"));
        // brief shake/red, then reset
        setTimeout(() => resetAll(), 1200);
      }
    } else {
      // no validator → treat as complete but keep neutral visuals
      onComplete?.(otp);
    }
  };

  const handleInputChange = async (index: number, value: string) => {
    // accept only a single digit
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    // typing clears global status

    // update value + mark cell as filled or default
    const nextValues = [...values];
    nextValues[index] = value;
    setValues(nextValues);
    setVisuals((prev) => {
      const next = [...prev];
      next[index] = value ? "filled" : "default";
      return next;
    });

    // auto-advance on entry
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setVisuals((prev) => {
        const next = [...prev];
        if (!nextValues[index + 1]) next[index + 1] = "active";
        return next;
      });
    }

    // validate if complete
    await runValidationIfComplete(nextValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (values[index]) {
        // clear current without moving
        setCell(index, "", "active");
      } else if (index > 0) {
        // move left and clear previous
        const prevIdx = index - 1;
        setCell(prevIdx, "", "active");
        inputRefs.current[prevIdx]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!text) return;

    const next = Array.from({ length }, (_, i) => text[i] || "");
    setValues(next);
    setVisuals(next.map((v) => (v ? "filled" : "default")));
    // focus last non-empty or first
    const last = Math.min(text.length, length) - 1;
    inputRefs.current[last >= 0 ? last : 0]?.focus();
    await runValidationIfComplete(next);
  };

  const handleFocus = (index: number) => {
    setVisuals((prev) => {
      const next = [...prev];
      if (!values[index]) next[index] = "active";
      return next;
    });
  };

  const handleBlur = (index: number) => {
    setVisuals((prev) => {
      const next = [...prev];
      if (!values[index]) next[index] = "default";
      return next;
    });
  };

  const getClass = (visual: CellVisual) => {
    const base =
      "w-14 h-14 text-center text-xl font-medium border-2 rounded-xl transition-all duration-200 focus:outline-none bg-white";

    switch (visual) {
      case "active":
        return cn(
          base,
          "border-blue-500 shadow-sm ring-2 ring-blue-100 animate-focus-scale"
        );
      case "filled":
        return cn(base, "border-gray-400 bg-gray-50 text-gray-900");
      case "success":
        return cn(
          base,
          "border-green-500 bg-green-50 text-gray-900 ring-2 ring-green-200 animate-pulse-success"
        );
      case "error":
        return cn(
          base,
          "border-red-500 bg-red-50 text-red-700 animate-shake ring-2 ring-red-200"
        );
      default:
        return cn(base, "border-gray-300 hover:border-gray-400");
    }
  };

  return (
    <div className={cn("flex gap-4", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          placeholder={placeholders?.[index] ?? ""}
          value={values[index]}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${index + 1}`}
          className={getClass(visuals[index])}
        />
      ))}
    </div>
  );
}

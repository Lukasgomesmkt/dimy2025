"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const logoColor = mounted && theme === "dark" ? "#FFFFFF" : "#FF6B00";
  const textColor = mounted && theme === "dark" ? "#FFFFFF" : "#333333";

  return (
    <div className="flex items-center justify-center h-16">
      <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Scissors icon */}
        <path d="M25 15C27.7614 15 30 12.7614 30 10C30 7.23858 27.7614 5 25 5C22.2386 5 20 7.23858 20 10C20 12.7614 22.2386 15 25 15Z" fill={logoColor} />
        <path d="M10 35C12.7614 35 15 32.7614 15 30C15 27.2386 12.7614 25 10 25C7.23858 25 5 27.2386 5 30C5 32.7614 7.23858 35 10 35Z" fill={logoColor} />
        <path d="M40 35C42.7614 35 45 32.7614 45 30C45 27.2386 42.7614 25 40 25C37.2386 25 35 27.2386 35 30C35 32.7614 37.2386 35 40 35Z" fill={logoColor} />
        <path d="M25 15L10 30" stroke={logoColor} strokeWidth="2" />
        <path d="M25 15L40 30" stroke={logoColor} strokeWidth="2" />

        {/* Text */}
        <text x="55" y="30" fontFamily="Arial" fontSize="22" fontWeight="bold" fill={textColor}>BARBER</text>
        <text x="55" y="45" fontFamily="Arial" fontSize="12" fill={textColor}>STYLE</text>
      </svg>
    </div>
  );
}

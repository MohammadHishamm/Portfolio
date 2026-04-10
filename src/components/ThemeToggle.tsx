"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton } from "@once-ui-system/core";

export const ThemeToggle: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("data-theme");
    const resolved =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setCurrentTheme(resolved);
  }, []);

  const toggle = () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("data-theme", next);
    setCurrentTheme(next);
  };

  const icon = currentTheme === "dark" ? "light" : "dark";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={toggle}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    />
  );
};

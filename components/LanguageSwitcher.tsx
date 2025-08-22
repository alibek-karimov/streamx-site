"use client";

import React, { useEffect, useState } from "react";
import i18n from "i18next";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const LANGS = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KZ" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  // only react hooks used here: useState/useEffect (stable)
  const [lang, setLang] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initial =
      (localStorage.getItem("i18nextLng") as string) || i18n.language || "ru";
    setLang(initial);
    setMounted(true);
  }, []);

  const change = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLang(lng);
      if (typeof window !== "undefined")
        localStorage.setItem("i18nextLng", lng);
    } catch {
      // noop
    }
  };

//   // Render stable placeholder before client hydration to avoid mismatch
//   if (!mounted) {
//     return (
//       <div className="flex items-center space-x-2 w-20">
//         <div className="px-3 py-1 rounded-md text-sm font-medium bg-transparent text-foreground">
//           {LANGS.find((l) => l.code === (lang || "ru"))?.label || "LANG"}
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="flex items-center space-x-2 w-20">
      <Select value={lang} onValueChange={change}>
        <SelectTrigger className="w-full tech-button neon-glow hover:scale-105 transition-transform" size="default">
          <SelectValue>
              {LANGS.find((l) => l.code === lang)?.label || "LANG"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LANGS.map((langOption) => (
            <SelectItem key={langOption.code} value={langOption.code}>
              {langOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

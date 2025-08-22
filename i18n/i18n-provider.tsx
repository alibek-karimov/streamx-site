"use client";
import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import kk from "./locales/kk.json";
import en from "./locales/en.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  kk: { translation: kk },
};

// Keep synchronous init so translations are available for first paint.
// We still treat language switching from saved value as async and show blur until done.
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initImmediate: false,
  });
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoadingLanguage(false);
      return;
    }

    const saved = localStorage.getItem("i18nextLng");
    if (saved && saved !== i18n.language) {
      // changeLanguage is async — keep page blurred until done (or failed)
      i18n
        .changeLanguage(saved)
        .catch(() => {
          /* ignore errors */
        })
        .finally(() => setLoadingLanguage(false));
    } else {
      // no saved language or already same — stop loading immediately
      setLoadingLanguage(false);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* container so overlay can cover entire app */}
      <div className="relative">
        {children}
        {loadingLanguage && (
          // fullscreen overlay: semi-transparent + backdrop blur + spinner
          <div
            aria-hidden
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              pointerEvents: "auto",
            }}
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{
                border: "4px solid rgba(255,255,255,0.25)",
                borderTopColor: "rgba(255,255,255,0.9)",
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}
      </div>
    </I18nextProvider>
  );
}

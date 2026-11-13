import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// Public production site key
const PROD_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeyOA4uAAAAAPimUMTFD3yFf8nHfC6EERSgG6gA";

// Google's official reCAPTCHA v2 test site key
// Works on localhost / 127.0.0.1, never blocks, supports dark theme natively, loads instantly without validation delay
const DEV_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export function getRecaptchaSiteKey() {
  if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
    return import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  }
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
      return DEV_TEST_SITE_KEY;
    }
  }
  return PROD_SITE_KEY;
}

export const RECAPTCHA_SITE_KEY = PROD_SITE_KEY;

const SCRIPT_ID = "google-recaptcha-v2";
const ONLOAD_CB = "__number9RecaptchaOnLoad";

let loadPromise = null;

function loadRecaptcha() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.grecaptcha && window.grecaptcha.render) return Promise.resolve(window.grecaptcha);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    window[ONLOAD_CB] = () => {
      if (window.grecaptcha && window.grecaptcha.render) {
        resolve(window.grecaptcha);
      } else {
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(interval);
            resolve(window.grecaptcha);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(interval);
          if (window.grecaptcha) resolve(window.grecaptcha);
          else reject(new Error("reCAPTCHA render unavailable"));
        }, 3000);
      }
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?onload=${ONLOAD_CB}&render=explicit`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        loadPromise = null;
        reject(new Error("Failed to load reCAPTCHA"));
      };
      document.head.appendChild(script);
    }
  });

  return loadPromise;
}

/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox).
 * Supports light & dark themes, auto-syncing with app theme.
 * onChange(token) fires with the token, or with "" when it expires / errors.
 * ref.reset() clears the widget (call after a submit attempt).
 */
const ReCaptcha = forwardRef(function ReCaptcha(
  { onChange, theme: explicitTheme, className = "" },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const themeContext = useTheme();
  const isDark =
    themeContext?.isDark ??
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  const activeTheme = explicitTheme || (isDark ? "dark" : "light");

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch (e) {}
      }
      onChangeRef.current?.("");
    },
  }));

  useEffect(() => {
    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !containerRef.current) return;
        try {
          containerRef.current.innerHTML = "";
          const siteKey = getRecaptchaSiteKey();
          widgetIdRef.current = grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            theme: activeTheme,
            callback: (token) => onChangeRef.current?.(token),
            "expired-callback": () => onChangeRef.current?.(""),
            "error-callback": () => onChangeRef.current?.(""),
          });
        } catch (e) {
          console.warn("reCAPTCHA render notice:", e);
        }
      })
      .catch(() => onChangeRef.current?.(""));

    return () => {
      cancelled = true;
      widgetIdRef.current = null;
    };
  }, [activeTheme]);

  return (
    <div
      className={`recaptcha-wrapper inline-block bg-transparent ${className}`}
      style={{ width: "fit-content", maxWidth: "100%", background: "transparent" }}
    >
      <div
        ref={containerRef}
        key={activeTheme}
        className="recaptcha-widget bg-transparent"
        style={{ background: "transparent" }}
      />
    </div>
  );
});

export default ReCaptcha;

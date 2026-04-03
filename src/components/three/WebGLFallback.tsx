import { useEffect, useState, ReactNode } from "react";

interface WebGLFallbackProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Renders children only if WebGL is available.
 * Falls back to `fallback` prop (or null) otherwise.
 */
export default function WebGLFallback({ children, fallback = null }: WebGLFallbackProps) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  // Still checking — render nothing to avoid flicker
  if (supported === null) return null;
  if (!supported) return <>{fallback}</>;
  return <>{children}</>;
}

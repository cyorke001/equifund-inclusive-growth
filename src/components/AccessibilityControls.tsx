import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Type, Eye, Minimize2, X } from "lucide-react";

type FontSize = "normal" | "large" | "xl";

const AccessibilityControls = () => {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("equifund-a11y");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.fontSize) setFontSize(parsed.fontSize);
      if (parsed.reducedMotion) setReducedMotion(parsed.reducedMotion);
      if (parsed.highContrast) setHighContrast(parsed.highContrast);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("font-size-small", "font-size-normal", "font-size-large", "font-size-xl");
    root.classList.add(`font-size-${fontSize}`);
    root.classList.toggle("reduce-motion", reducedMotion);
    root.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("equifund-a11y", JSON.stringify({ fontSize, reducedMotion, highContrast }));
  }, [fontSize, reducedMotion, highContrast]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card hover:shadow-elevated transition-shadow"
        aria-label="Accessibility settings"
        title="Accessibility settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-20 left-6 z-50 w-72 rounded-xl border border-border bg-card p-5 shadow-elevated"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground text-sm">Accessibility</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2">
                <Type className="h-3.5 w-3.5" /> Text Size
              </label>
              <div className="flex gap-1.5">
                {(["normal", "large", "xl"] as FontSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 rounded-lg border-2 py-2 text-xs font-medium transition-all ${
                      fontSize === size
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                    aria-pressed={fontSize === size}
                  >
                    {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduced Motion */}
            <div className="mb-3">
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
                aria-pressed={reducedMotion}
              >
                <span className="flex items-center gap-2">
                  <Minimize2 className="h-3.5 w-3.5" /> Reduce Motion
                </span>
                <span className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${reducedMotion ? "bg-primary" : "bg-border"}`}>
                  <span className={`h-4 w-4 rounded-full bg-card shadow transition-transform ${reducedMotion ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>
            </div>

            {/* High Contrast */}
            <div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
                aria-pressed={highContrast}
              >
                <span className="flex items-center gap-2">
                  <Eye className="h-3.5 w-3.5" /> High Contrast
                </span>
                <span className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${highContrast ? "bg-primary" : "bg-border"}`}>
                  <span className={`h-4 w-4 rounded-full bg-card shadow transition-transform ${highContrast ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityControls;

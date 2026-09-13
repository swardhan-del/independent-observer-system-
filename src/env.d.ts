/// <reference types="astro/client" />

interface Window {
  /**
   * Timestamp (ms) of the visitor's previous visit to this device, set
   * synchronously by the inline head script in BaseLayout.astro before any
   * other page script runs. Undefined on a visitor's first-ever visit, or
   * when localStorage is unavailable. See src/lib/reading-history.ts.
   */
  __ioPreviousVisit?: number;
}

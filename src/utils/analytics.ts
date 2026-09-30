declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  'G-5CK441HN7R';

/**
 * Tracks a page view in Google Analytics 4.
 * Sends standard GA4 page_view parameters (page_path, page_location, page_title)
 * while respecting SPA client-side routing to avoid duplicates.
 */
export function trackPageView(path: string, customTitle?: string) {
  if (typeof window === 'undefined') return;

  const pageLocation = window.location.origin + path;
  const pageTitle = customTitle || document.title || 'PETSHOP';

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: path,
      send_to: GA_MEASUREMENT_ID,
    });
  }
}

/**
 * Optional helper to track custom interactions in Google Analytics 4.
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
  }
}

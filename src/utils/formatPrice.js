/**
 * Format a price for the European market.
 * Defaults to EUR with European locale formatting.
 */
export const formatPrice = (amount, currencyCode = 'EUR', locale = 'en-IE') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '€0.00';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Supported locales for EU markets.
 */
export const EU_LOCALES = {
  'en-IE': { currency: 'EUR', label: 'Ireland (English)' },
  'nl-NL': { currency: 'EUR', label: 'Netherlands' },
  'de-DE': { currency: 'EUR', label: 'Germany' },
  'fr-FR': { currency: 'EUR', label: 'France' },
  'es-ES': { currency: 'EUR', label: 'Spain' },
  'it-IT': { currency: 'EUR', label: 'Italy' },
  'en-GB': { currency: 'GBP', label: 'United Kingdom' },
};

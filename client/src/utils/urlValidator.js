/**
 * URL Validation & Sanitization Utility for NexKind
 * Ensures all external application, registration, and source links are legitimate,
 * safe, and verifiable HTTPS/HTTP links.
 */

const BLOCKED_PROTOCOLS = ['javascript:', 'data:', 'vbscript:', 'file:'];
const PLACEHOLDER_PATTERNS = [
  /^#/,
  /^javascript:/i,
  /^null$/i,
  /^undefined$/i,
  /^none$/i,
  /^tbd$/i,
  /^n\/a$/i,
  /example\.com/i,
  /placeholder/i,
  /fake/i,
];

/**
 * Validates whether a URL is a legitimate, navigable HTTP/HTTPS address.
 * @param {string} url - The candidate URL to validate
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed.length < 5) return false;

  // Check against blacklisted placeholders
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(trimmed)) return false;
  }

  for (const protocol of BLOCKED_PROTOCOLS) {
    if (trimmed.toLowerCase().startsWith(protocol)) return false;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    // If it starts with www. or known domain without protocol, test prepending https://
    if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
      try {
        const parsed = new URL(`https://${trimmed}`);
        return parsed.protocol === 'https:';
      } catch {
        return false;
      }
    }
    return false;
  }
};

/**
 * Sanitizes and normalizes a candidate URL, prepending https:// if needed.
 * @param {string} url - The candidate URL
 * @param {string|null} fallback - Fallback URL if candidate is invalid
 * @returns {string|null}
 */
export const sanitizeUrl = (url, fallback = null) => {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();

  if (!isValidUrl(trimmed)) return fallback;

  try {
    const parsed = new URL(trimmed);
    return parsed.href;
  } catch {
    if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return fallback;
  }
};

/**
 * Extracts and validates apply/registration and source URLs for an opportunity
 * @param {Object} item - Job, Scholarship, or Event object
 * @param {'job'|'scholarship'|'event'} type - Type of opportunity
 * @returns {Object} { applyUrl, sourceUrl, sourceName, hasValidApplyUrl, hasValidSourceUrl, instructions }
 */
export const getOpportunityApplyInfo = (item, type = 'job') => {
  if (!item) {
    return {
      applyUrl: null,
      sourceUrl: null,
      sourceName: 'Official Portal',
      hasValidApplyUrl: false,
      hasValidSourceUrl: false,
      instructions: [],
    };
  }

  let rawApply = null;
  let rawSource = null;
  let defaultSource = 'Official Organization Portal';

  if (type === 'job') {
    rawApply = item.applyUrl || item.applyLink || item.applicationUrl;
    rawSource = item.sourceUrl || item.companyLink;
    defaultSource = item.company ? `${item.company} Careers` : 'Official Company Website';
  } else if (type === 'scholarship') {
    rawApply = item.applyUrl || item.applyLink;
    rawSource = item.sourceUrl || item.providerLink;
    defaultSource = item.provider || item.university ? `${item.provider || item.university} Portal` : 'Official Scholarship Portal';
  } else if (type === 'event') {
    rawApply = item.registrationUrl || item.registrationLink;
    rawSource = item.sourceUrl || item.meetingUrl;
    defaultSource = item.organizer ? `${item.organizer}` : 'Official Event Organizer';
  }

  const applyUrl = sanitizeUrl(rawApply);
  const sourceUrl = sanitizeUrl(rawSource);
  const sourceName = item.sourceName || item.source || defaultSource;

  // Extract instructions array
  let instructions = [];
  const rawInst = item.applicationInstructions || item.registrationInstructions;
  if (Array.isArray(rawInst) && rawInst.length > 0) {
    instructions = rawInst.filter(Boolean);
  } else if (typeof rawInst === 'string' && rawInst.trim()) {
    instructions = rawInst.split('\n').map((s) => s.trim().replace(/^\d+\.\s*/, '')).filter(Boolean);
  }

  return {
    applyUrl,
    sourceUrl,
    sourceName,
    hasValidApplyUrl: Boolean(applyUrl),
    hasValidSourceUrl: Boolean(sourceUrl),
    instructions,
  };
};

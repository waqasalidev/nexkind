const COMPANY_DOMAINS = {
  google: 'google.com',
  microsoft: 'microsoft.com',
  amazon: 'amazon.com',
  apple: 'apple.com',
  meta: 'meta.com',
  facebook: 'facebook.com',
  netflix: 'netflix.com',
  spotify: 'spotify.com',
  slack: 'slack.com',
  linkedin: 'linkedin.com',
  coursera: 'coursera.org',
  udemy: 'udemy.com',
  edx: 'edx.org',
  ibm: 'ibm.com',
  oracle: 'oracle.com',
  salesforce: 'salesforce.com',
  adobe: 'adobe.com',
  twitter: 'twitter.com',
  x: 'x.com',
  tesla: 'tesla.com',
  nvidia: 'nvidia.com',
  intel: 'intel.com',
  github: 'github.com',
  atlassian: 'atlassian.com',
  airbnb: 'airbnb.com',
  uber: 'uber.com',
  paypal: 'paypal.com',
  stripe: 'stripe.com',
};

const resolveCompanyDomain = (company) => {
  if (!company) return null;
  const key = company
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+(inc|llc|ltd|corp|co|systems|solutions|technologies|tech)\.?$/i, '')
    .trim();

  if (COMPANY_DOMAINS[key]) return COMPANY_DOMAINS[key];

  const slug = key.replace(/\s+/g, '');
  if (slug && COMPANY_DOMAINS[slug]) return COMPANY_DOMAINS[slug];

  return slug ? `${slug}.com` : null;
};

const getFaviconUrl = (domain, size = 128) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;

const getClearbitUrl = (domain) => `https://logo.clearbit.com/${domain}`;

const getCompanyLogoUrl = (company, image) => {
  if (image && image.trim()) return image.trim();
  const domain = resolveCompanyDomain(company);
  if (!domain) return null;
  return getFaviconUrl(domain, 128);
};

const getCompanyLogoCandidates = (company, image) => {
  const candidates = [];
  if (image?.trim()) candidates.push(image.trim());

  const domain = resolveCompanyDomain(company);
  if (domain) {
    candidates.push(getFaviconUrl(domain, 128));
    candidates.push(getClearbitUrl(domain));
  }

  return [...new Set(candidates)];
};

const getAvatarFallback = (name, size = 128) => {
  const label = encodeURIComponent((name || 'Company').slice(0, 2));
  return `https://ui-avatars.com/api/?name=${label}&background=2563eb&color=fff&size=${size}&bold=true`;
};

module.exports = {
  getCompanyLogoUrl,
  getCompanyLogoCandidates,
  getAvatarFallback,
  resolveCompanyDomain,
};

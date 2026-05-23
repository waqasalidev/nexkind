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

export const resolveCompanyDomain = (company) => {
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

export const getLogoCandidates = (name, src) => {
  const candidates = [];
  if (src?.trim()) candidates.push(src.trim());

  const domain = resolveCompanyDomain(name);
  if (domain) {
    candidates.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    candidates.push(`https://logo.clearbit.com/${domain}`);
  }

  const label = encodeURIComponent((name || 'C').slice(0, 2));
  candidates.push(`https://ui-avatars.com/api/?name=${label}&background=2563eb&color=fff&size=128&bold=true`);

  return [...new Set(candidates)];
};

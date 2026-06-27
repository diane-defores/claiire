/**
 * Home Section Sidebar Navigation
 *
 * Defines the navigation structure for the home/general section of the site.
 * Contains links to landing page, about, contact, and privacy policy.
 *
 * Note: Sidebar is collapsed by default to reduce visual clutter, as most users
 * will be navigating to the main content sections (psychology, health, violence).
 */
export const accueilSidebar = {
  label: 'Accueil',
  collapsed: true, // Collapsed by default - general pages accessed less frequently
  items: [
    { label: 'Accueil', link: '/' },
    { label: 'Notre Approche', link: '/a-propos' },
    { label: 'Contact', link: '/contact' },
    { label: 'Vie Privée', link: '/vie-privee' },
    { label: 'Confidentialité', link: '/confidentialite' },
  ],
};

/**
 * Psychology Section Sidebar Navigation
 *
 * The largest and most complex navigation structure in the site, covering:
 * - Psychological approaches (cognitive, behavioral, humanistic, etc.)
 * - Emotions and emotional well-being
 * - Social codes and communication
 * - Trauma and healing
 * - Personal development
 *
 * This section uses deep nesting (up to 3 levels) to organize extensive content
 * while maintaining usability. Each subsection is collapsible to prevent overwhelming users.
 *
 * Design decision: Despite the depth, we maintain consistent patterns with 'Vue d\'ensemble'
 * (overview) pages at each level to provide context before detailed content.
 */
export const psychologieSidebar = {
  label: 'Psychologie',
  collapsed: true, // Main section collapsed by default
  items: [
    {
      label: 'Introduction',
      link: '/psy/',
    },
    {
      label: 'Approches',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/approche/' },
        { label: 'Cognitive', link: '/psy/approche/cognitive' },
        { label: 'Comportementale', link: '/psy/approche/comportementale' },
        { label: 'Humaniste', link: '/psy/approche/humaniste' },
        { label: 'Neurosciences', link: '/psy/approche/neurosciences' },
        { label: 'Psychodynamique', link: '/psy/approche/psychodynamique' },
        {
          label: 'Domaines',
          collapsed: true,
          items: [{ label: "Vue d'ensemble", link: '/psy/approche/domaines/' }],
        },
        {
          label: 'Méthodes',
          collapsed: true,
          items: [{ label: "Vue d'ensemble", link: '/psy/approche/methodes/' }],
        },
        {
          label: 'Pratiques',
          collapsed: true,
          items: [{ label: "Vue d'ensemble", link: '/psy/approche/pratique/' }],
        },
      ],
    },
    {
      label: 'Codes Sociaux',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/Codes Sociaux/' }],
    },
    {
      label: 'Communication',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/communication/' }],
    },
    {
      label: 'Concepts',
      collapsed: true,
      items: [{ label: 'Liberté Intérieure', link: '/psy/concepts/liberte-interieure' }],
    },
    {
      label: 'Développement',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/developpement/' }],
    },
    {
      label: 'Dualité',
      link: '/psy/dualite',
    },
    {
      label: 'Émotions',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/emotions/' },
        { label: 'Amour', link: '/psy/emotions/amour' },
        { label: 'Appartenance', link: '/psy/emotions/appartenance' },
        { label: 'Gratitude', link: '/psy/emotions/gratitude' },
        { label: 'Honte', link: '/psy/emotions/honte' },
        { label: 'Intentions', link: '/psy/emotions/intentions' },
        { label: 'Joie', link: '/psy/emotions/joie' },
        { label: 'Kit SOS Émotions', link: '/psy/emotions/kit-sos-emotions' },
        { label: 'Outils & Ressources', link: '/psy/emotions/outils-ressources' },
        { label: 'Rituels Émotionnels', link: '/psy/emotions/rituels-emotions' },
        { label: 'Sérénité', link: '/psy/emotions/serenite' },
        {
          label: 'Qualité',
          collapsed: true,
          items: [{ label: "Vue d'ensemble", link: '/psy/emotions/qualite/' }],
        },
      ],
    },
    {
      label: 'Équilibre',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/equilibre/' }],
    },
    {
      label: 'Guerriers & Guerrières',
      collapsed: true,
      items: [
        { label: 'Guerriers Légendaires', link: '/psy/guerriers-legendaires' },
        { label: 'Guerrières Légendaires', link: '/psy/guerrieres-legendaires' },
      ],
    },
    {
      label: 'Histoire',
      link: '/psy/histoire',
    },
    {
      label: 'Parties Intérieures',
      link: '/psy/parties-interieures',
    },
    {
      label: 'Pouvoir',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/pouvoir/' }],
    },
    {
      label: 'Rédemption Criminelle',
      link: '/psy/redemption-criminelle',
    },
    {
      label: 'Société',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/societe/' }],
    },
    {
      label: 'Solutions',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/solution/' }],
    },
    {
      label: 'Trauma',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/trauma/' }],
    },
    {
      label: 'Urgence',
      link: '/psy/urgence', // Critical: Quick access to crisis resources
    },
    // Navigation structure considerations:
    // - Deep hierarchy (up to 3 levels) balances organization vs. accessibility
    // - Collapsed sections by default prevent overwhelming users
    // - 'Vue d\'ensemble' pages provide context at each level
    // - Mix of direct links and nested groups for different content types
  ],
};

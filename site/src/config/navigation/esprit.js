/**
 * Esprit Section Sidebar Navigation
 *
 * Mindset, thinking patterns, psychology of behavior and change.
 * Covers: cognitive frameworks, communication, social dynamics,
 * leadership, personal development, biases, and society.
 */
export const espritSidebar = {
  label: 'Esprit',
  collapsed: true,
  items: [
    {
      label: 'Introduction',
      link: '/psy/',
    },
    {
      label: 'Confiance',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/confiance/' },
        { label: 'En soi', link: '/confiance/confiance-en-soi' },
        { label: 'En les autres', link: '/confiance/confiance-en-les-autres' },
        { label: 'En la vie', link: '/confiance/confiance-en-la-vie' },
        { label: 'Se reconstruire', link: '/confiance/reconstruire' },
      ],
    },
    {
      label: 'Objectifs & Habitudes',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/objectifs/' },
        { label: 'Définir ses objectifs', link: '/objectifs/definir-ses-objectifs' },
        { label: 'Changer ses habitudes', link: '/objectifs/changer-ses-habitudes' },
      ],
    },
    {
      label: 'Burn-out',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/burnout/' },
        { label: 'Les causes', link: '/burnout/causes' },
        { label: 'Sortir du burn-out', link: '/burnout/sortir-du-burnout' },
      ],
    },
    {
      label: 'Approches Psychologiques',
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
      label: 'Biais Cognitifs',
      link: '/psy/biais/',
    },
    {
      label: 'Communication',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/communication/' },
        { label: 'Manipulation', link: '/psy/communication/manipulation/' },
        { label: 'Machiavel', link: '/psy/communication/machiavel/' },
        { label: 'Pouvoir des mots', link: '/psy/communication/pouvoir-des-mots' },
      ],
    },
    {
      label: 'Codes Sociaux',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/codes-sociaux/' },
        { label: 'Neurologie sociale', link: '/psy/codes-sociaux/neurologie' },
        { label: 'Cultures', link: '/psy/codes-sociaux/cultures' },
        { label: 'Numérique', link: '/psy/codes-sociaux/numerique' },
      ],
    },
    {
      label: 'Développement',
      link: '/psy/developpement/',
    },
    {
      label: 'Dualité',
      link: '/psy/dualite',
    },
    {
      label: 'Histoire de la Psychologie',
      link: '/psy/histoire',
    },
    {
      label: 'Parties Intérieures',
      link: '/psy/parties-interieures',
    },
    {
      label: 'Pouvoir & Leadership',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/pouvoir/' },
        { label: 'Mécanismes du leadership', link: '/psy/pouvoir/mecanismes-leadership' },
        { label: 'Pouvoir dans les relations', link: '/psy/pouvoir/pouvoir-relations' },
        { label: 'Éthique & Responsabilité', link: '/psy/pouvoir/ethique-responsabilite' },
      ],
    },
    {
      label: 'Rédemption',
      link: '/psy/redemption-criminelle',
    },
    {
      label: 'Société',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/psy/societe/' }],
    },
    {
      label: 'Guerriers & Guerrières',
      collapsed: true,
      items: [
        { label: 'Guerriers Légendaires', link: '/psy/guerriers-legendaires' },
        { label: 'Guerrières Légendaires', link: '/psy/guerrieres-legendaires' },
      ],
    },
  ],
};

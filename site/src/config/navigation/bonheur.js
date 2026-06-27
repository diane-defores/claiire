/**
 * Bonheur Section Sidebar Navigation
 *
 * The destination — why everything else exists.
 * Covers happiness science, well-being practices, harmony and balance.
 */
export const bonheurSidebar = {
  label: '✨ Bonheur',
  collapsed: true,
  items: [
    {
      label: 'Le Bonheur',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/bonheur/' },
        { label: 'Les hormones du bonheur', link: '/bonheur/les-hormones-du-bonheur' },
        { label: 'Augmenter ses hormones', link: '/bonheur/comment-augmenter-ses-hormones-du-bonheur' },
        { label: 'Bonheur durable', link: '/bonheur/bonheur-durable' },
        { label: 'Cultiver le bonheur', link: '/bonheur/cultiver-le-bonheur' },
        { label: 'Équilibre mental', link: '/bonheur/mental' },
        { label: 'Moment présent', link: '/bonheur/choyer-le-moment-present' },
      ],
    },
    {
      label: 'Harmonie',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/harmonie/' },
        { label: 'Méditation', link: '/harmonie/meditation' },
        { label: 'Équilibre de vie', link: '/harmonie/equilibre-vie' },
        { label: 'Homéostasie', link: '/harmonie/homeostasie' },
        { label: 'Chronobiologie', link: '/harmonie/chronobiologie' },
      ],
    },
    {
      label: 'Spiritualité & Sens',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/spiritualite/' },
        { label: 'Ce que dit la science', link: '/spiritualite/science-et-spiritualite' },
        { label: 'Croire en la vie', link: '/spiritualite/croire-en-la-vie' },
        { label: 'Trouver son sens', link: '/spiritualite/trouver-son-sens' },
      ],
    },
  ],
};

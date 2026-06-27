/**
 * Violence Section Sidebar Navigation
 *
 * Defines navigation structure for violence-related content and resources.
 * Includes landing pages for victims and perpetrators, with comprehensive
 * resources for understanding, prevention, and support.
 *
 * Note: This is a sensitive topic section that requires careful content curation.
 */
export const violenceSidebar = {
  label: 'La Violence',
  collapsed: true, // Collapsed by default for user discretion
  items: [
    {
      label: 'Introduction',
      link: '/violence/',
    },
    {
      label: '💙 Ressources Victimes',
      link: '/violence/victimes/',
    },
    {
      label: '🔄 Sortir de la Violence (Auteurs)',
      link: '/violence/auteurs/',
    },
    {
      label: 'Comprendre',
      collapsed: true,
      items: [
        { label: 'Types de violence', link: '/violence/types/' },
        { label: 'Causes', link: '/violence/causes/' },
        { label: 'Mécanismes', link: '/violence/mecanismes/' },
        { label: 'Fight, Flight, Freeze, Fawn', link: '/violence/mecanismes/reactions-survie-4f' },
        { label: 'Profils', link: '/violence/profils/' },
      ],
    },
    {
      label: 'Agir',
      collapsed: true,
      items: [
        { label: 'Solutions', link: '/violence/solutions/' },
        { label: 'Urgence', link: '/violence/solutions/urgence' },
      ],
    },
    {
      label: 'Harcèlement',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/harcelement/' },
        { label: 'Au travail', link: '/harcelement/harcelement-professionnel' },
        { label: 'Scolaire', link: '/harcelement/harcelement-scolaire' },
      ],
    },
  ],
};

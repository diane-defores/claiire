/**
 * Parcours Thématiques Sidebar Navigation
 *
 * Defines navigation for guided thematic learning paths.
 * Each parcours is a curated journey through related content
 * with progress tracking and structured learning.
 */
export const parcoursSidebar = {
  label: '🎯 Parcours Thématiques',
  collapsed: false, // Visible by default for discoverability
  items: [
    { label: '😊 Être plus heureux', link: '/parcours/bonheur' },
    { label: '😰 Gérer le stress', link: '/parcours/stress' },
    { label: '😴 Améliorer le sommeil', link: '/parcours/sommeil' },
    { label: '👥 Relations sociales', link: '/parcours/relations' },
    { label: '💪 Renforcer la santé', link: '/parcours/sante' },
    { label: '🧠 Comprendre l\'esprit', link: '/parcours/esprit' },
  ],
};

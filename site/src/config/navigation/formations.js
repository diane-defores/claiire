/**
 * Formations Section Sidebar Navigation
 *
 * Defines navigation structure for practical training programs.
 * Structure : socle commun (4 modules) → parcours victimes (6) / parcours auteurs (6)
 * Cadres cliniques : Judith Herman (victimes), Duluth + TCC + trauma-informé (auteurs)
 */
export const formationsSidebar = {
  label: 'Formations',
  collapsed: true,
  items: [
    { label: 'Présentation', link: '/formations/' },
    {
      label: 'Socle Commun',
      collapsed: true,
      items: [
        { label: '1 · Comprendre la violence', link: '/formations/socle/1-comprendre/' },
        { label: '2 · Corps et cerveau', link: '/formations/socle/2-neurobiologie/' },
        { label: '3 · Réguler ses émotions', link: '/formations/socle/3-stabilisation/' },
        { label: '4 · Schémas cognitifs', link: '/formations/socle/4-cognition/' },
      ],
    },
    {
      label: 'Parcours Victimes',
      collapsed: true,
      items: [
        { label: 'Introduction', link: '/formations/victimes/' },
        { label: '1 · Plan de sécurité', link: '/formations/victimes/1-securite/' },
        { label: '2 · Guérison du trauma', link: '/formations/victimes/2-guerison/' },
        { label: '3 · Poser ses limites', link: '/formations/victimes/3-limites/' },
        { label: '4 · Reconstruction relationnelle', link: '/formations/victimes/4-relations/' },
        { label: '5 · Autonomisation', link: '/formations/victimes/5-autonomie/' },
        { label: '6 · Ancrage durable', link: '/formations/victimes/6-ancrage/' },
      ],
    },
    {
      label: 'Parcours Auteurs',
      collapsed: true,
      items: [
        { label: 'Introduction', link: '/formations/auteurs/' },
        { label: '1 · Sortir du déni', link: '/formations/auteurs/1-responsabilite/' },
        { label: '2 · Comprendre son cycle', link: '/formations/auteurs/2-cycle/' },
        { label: '3 · Gérer ses émotions', link: '/formations/auteurs/3-emotions/' },
        { label: "4 · Développer l'empathie", link: '/formations/auteurs/4-empathie/' },
        { label: '5 · Relations équilibrées', link: '/formations/auteurs/5-relations/' },
        { label: '6 · Prévenir la récidive', link: '/formations/auteurs/6-prevention/' },
      ],
    },
  ],
};

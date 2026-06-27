/**
 * Émotions Section Sidebar Navigation
 *
 * Feelings, emotional regulation, trauma, mental health, and wellbeing.
 * More visceral and body-adjacent than Esprit — covers what we feel,
 * how we heal, and how we build lasting happiness.
 */
export const emotionsSidebar = {
  label: 'Émotions',
  collapsed: true,
  items: [
    {
      label: 'Les Émotions',
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
          label: 'Qualités Émotionnelles',
          collapsed: true,
          items: [{ label: "Vue d'ensemble", link: '/psy/emotions/qualite/' }],
        },
      ],
    },
    {
      label: 'Anxiété',
      collapsed: true,
      items: [
        { label: "Comprendre l'anxiété", link: '/anxiete/' },
        { label: 'Attaques de panique', link: '/anxiete/attaque-de-panique/' },
        { label: 'Anxiété sociale', link: '/anxiete/anxiete-sociale/' },
        { label: 'Solutions', link: '/anxiete/solutions-anxiete/' },
        { label: 'Anxiété et corps', link: '/anxiete/anxiete-corps/' },
      ],
    },
    {
      label: 'Santé Mentale',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/developpement/trouble/' },
        { label: 'Anxiété', link: '/psy/developpement/trouble/anxiete' },
        { label: 'Angoisse', link: '/psy/developpement/trouble/angoisse' },
        { label: 'Humeur & Dépression', link: '/psy/developpement/trouble/humeur' },
        { label: 'TOC', link: '/psy/developpement/trouble/toc' },
        { label: 'Psychopathie', link: '/psy/developpement/trouble/psychopathie/' },
      ],
    },
    {
      label: 'Relations',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/relations/' },
        { label: 'Attachement', link: '/relations/attachement' },
        { label: 'Relations toxiques', link: '/relations/relations-toxiques' },
        { label: 'Poser ses limites', link: '/relations/limites' },
        { label: 'Relations saines', link: '/relations/relations-saines' },
        { label: 'Se reconstruire après', link: '/relations/se-reconstruire-apres' },
      ],
    },
    {
      label: 'Deuil',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/deuil/' },
        { label: 'Les étapes du deuil', link: '/deuil/etapes-du-deuil' },
        { label: 'Traverser le deuil', link: '/deuil/traverser-le-deuil' },
      ],
    },
    {
      label: 'Trauma',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/psy/trauma/' },
        { label: 'Inceste', link: '/psy/trauma/inceste' },
        { label: 'Inceste Émotionnel', link: '/psy/trauma/inceste-emotionnel' },
        { label: 'Victimologie', link: '/psy/trauma/victimologie' },
      ],
    },
    {
      label: 'Équilibre Mental',
      link: '/psy/equilibre/',
    },
    {
      label: 'Solutions & Thérapies',
      collapsed: true,
      items: [
        { label: 'Résilience', link: '/psy/solution/resilience' },
        { label: 'Résilience & Blessures', link: '/psy/solution/resilience-transformation-blessures' },
        { label: 'Mindfulness', link: '/psy/solution/mindfulness' },
        { label: 'Psychothérapie', link: '/psy/solution/psychotherapie' },
        { label: 'Relaxation', link: '/psy/solution/relaxation' },
        { label: 'Médicaments', link: '/psy/solution/medicaments' },
      ],
    },
    {
      label: '🆘 Urgence',
      link: '/psy/urgence',
    },
  ],
};

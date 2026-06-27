/**
 * Body & Health Section Sidebar Navigation
 *
 * Comprehensive navigation structure for physical health topics including:
 * - Body systems (cardiovascular, digestive, nervous, immune, etc.)
 * - Health concepts (epigenetics, stress, sleep)
 * - Medical information
 *
 * Organized hierarchically with collapsed subsections for better UX.
 * Each major body system or health topic has its own expandable group.
 */
export const corpsSidebar = {
  label: 'Corps & Santé',
  collapsed: true,
  items: [
    {
      label: 'Activité',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/activite/' },
        { label: 'Physique', link: '/activite/physique/' },
        { label: 'Intellectuelle', link: '/activite/intellectuelle/' },
      ],
    },
    {
      label: 'Bonheur',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/bonheur/' },
        { label: 'Hormones du bonheur', link: '/bonheur/les-hormones-du-bonheur' },
        { label: 'Bonheur durable', link: '/bonheur/bonheur-durable' },
        { label: 'Cultiver le bonheur', link: '/bonheur/cultiver-le-bonheur' },
      ],
    },
    {
      label: 'Cellules',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/cellules/' },
        { label: 'Santé cellulaire', link: '/cellules/sante-cellulaire' },
        { label: 'Collagène', link: '/cellules/collagene' },
        { label: 'Muscles', link: '/cellules/muscles' },
        { label: 'Santé osseuse', link: '/cellules/sante-osseuse' },
      ],
    },
    {
      label: 'Cosmétiques',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/cosmetique/' },
        { label: 'Choisir ses cosmétiques', link: '/cosmetique/choisir' },
        { label: 'Marques françaises', link: '/cosmetique/marques-naturelles-francaises' },
      ],
    },
    {
      label: 'Épigénétique',
      link: '/epigenetique',
    },
    {
      label: 'Environnement',
      link: '/environnement',
    },
    {
      label: 'Harmonie',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/harmonie/' }],
    },
    {
      label: 'Maladie',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/maladie/' },
        { label: 'Cancer', link: '/maladie/cancer' },
        { label: 'Migraine', link: '/maladie/migraine' },
      ],
    },
    {
      label: 'Médecine',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/medecine/' }],
    },
    {
      label: 'Nutrition',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/nutrition/' },
        { label: 'Protéines', link: '/nutrition/proteines' },
        { label: 'Acides aminés', link: '/nutrition/acides-amines' },
      ],
    },
    {
      label: 'Sens',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/sens/' },
        { label: 'La vue', link: '/sens/vue' },
      ],
    },
    {
      label: 'Sommeil',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/sommeil/' },
        { label: 'Cycles du sommeil', link: '/sommeil/cycles' },
        { label: 'Hygiène du sommeil', link: '/sommeil/hygiene' },
        { label: 'Dette de sommeil', link: '/sommeil/dette' },
      ],
    },
    {
      label: 'Stress',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/stress/' },
        { label: 'Mécanismes', link: '/stress/mecanismes' },
        { label: 'Bon et mauvais stress', link: '/stress/bon-et-mauvais' },
        { label: 'Solutions naturelles', link: '/stress/solutions-naturelles' },
      ],
    },
    {
      label: 'Système Cardiovasculaire',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/systeme-cardio/' }],
    },
    {
      label: 'Système Digestif',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/systeme-digestif/' }],
    },
    {
      label: 'Système Hormonal',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/systeme-hormonal/' },
        { label: 'Mélatonine', link: '/systeme-hormonal/melatonine' },
      ],
    },
    {
      label: 'Système Immunitaire',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/systeme-immunitaire/' }],
    },
    {
      label: 'Système Nerveux',
      collapsed: true,
      items: [
        { label: "Vue d'ensemble", link: '/systeme-nerveux/' },
        { label: 'Le cerveau', link: '/systeme-nerveux/cerveau' },
        { label: 'Nerf vague', link: '/systeme-nerveux/nerf-vague' },
        { label: 'Impact du stress', link: '/systeme-nerveux/stress-impact' },
        { label: 'Nutrition nerveuse', link: '/systeme-nerveux/nutrition-nerveuse' },
      ],
    },
    {
      label: 'Système Social',
      collapsed: true,
      items: [{ label: "Vue d'ensemble", link: '/systeme-social/' }],
    },
  ],
};

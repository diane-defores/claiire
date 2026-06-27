/**
 * Navigation Configuration Module
 *
 * Centralized export point for all sidebar navigation configurations.
 * Each sidebar represents a major content section of the site and is defined
 * in a separate file for better organization and maintainability.
 *
 * This modular approach allows:
 * - Independent updates to each section's navigation
 * - Better code organization and readability
 * - Easier collaboration (different team members can work on different sections)
 * - Reduced merge conflicts
 */

export { accueilSidebar } from './accueil';
export { corpsSidebar } from './corps';
export { espritSidebar } from './esprit';
export { emotionsSidebar } from './emotions';
export { bonheurSidebar } from './bonheur';
export { violenceSidebar } from './violence';
export { parcoursSidebar } from './parcours';
export { formationsSidebar } from './formations';

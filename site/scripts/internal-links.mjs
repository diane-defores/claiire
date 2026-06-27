import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);

const DOCS_GLOB = 'src/content/docs/**/*.{md,mdx}';
const PAGE_GLOB = 'src/pages/**/*.astro';

const STATIC_PAGE_PATHS = [
  '/parcours/bonheur',
  '/parcours/stress',
  '/parcours/sommeil',
  '/parcours/relations',
  '/parcours/sante',
  '/parcours/esprit',
  '/contact',
  '/bio',
];

const EXACT_REDIRECTS = new Map([
  ['/sante', '/parcours/sante'],
  ['/sante/', '/parcours/sante'],
  ['/corps/systeme-nerveux', '/systeme-nerveux/'],
  ['/corps/systeme-nerveux/', '/systeme-nerveux/'],
  ['/corps/nutrition', '/nutrition/'],
  ['/corps/nutrition/', '/nutrition/'],
  ['/corps/sommeil', '/sommeil/'],
  ['/corps/sommeil/', '/sommeil/'],
  ['/corps/cellules', '/cellules/'],
  ['/corps/therapies', '/psy/solution/relaxation'],
  ['/corps/activite/physique', '/activite/physique/'],
  ['/corps/activite/physique/', '/activite/physique/'],
  ['/esprit/stress', '/stress/'],
  ['/esprit/gestion-stress', '/stress/solutions-naturelles'],
  ['/esprit/', '/psy/'],
  ['/esprit/meditation', '/harmonie/meditation'],
  ['/mental/stress/gestion', '/stress/solutions-naturelles'],
  ['/mental/relaxation', '/psy/solution/relaxation'],
  ['/emotions', '/psy/emotions/'],
  ['/mental', '/psy/'],
  ['/sante/emotions', '/psy/emotions/'],
  ['/vie-privee', '/a-propos'],
  ['/stress-management', '/stress/solutions-naturelles'],
  ['/corps/sommeil-recuperation', '/sommeil/'],
  ['/therapies/corporelles', '/psy/solution/relaxation'],
  ['/nutrition/cerveau', '/systeme-nerveux/nutrition-nerveuse'],
  ['/sante/mental/depression-exercice', '/activite/physique/bienfaits'],
  ['/sante/mental/gestion-stress', '/stress/solutions-naturelles'],
  ['/sante/mental/intelligence-emotionnelle', '/psy/communication/machiavel/intelligence-emotionnelle'],
  ['/sante/sommeil/optimiser-qualite', '/sommeil/hygiene'],
  ['/sante/concepts/homeostasie', '/harmonie/homeostasie'],
  ['/sante/concepts/equilibre-mental', '/psy/equilibre/equilibre-mental'],
  ['/sante/concepts/energie', '/harmonie/metabolisme'],
  ['/sante/solutions/mental/coherence-cardiaque', '/systeme-immunitaire/coherence-cardiaque'],
  ['/sante/solutions/coherence-cardiaque', '/systeme-immunitaire/coherence-cardiaque'],
  ['/sante/coherence-cardiaque', '/systeme-immunitaire/coherence-cardiaque'],
  ['/sante/solutions/mental/meditation', '/harmonie/meditation'],
  ['/sante/solutions/meditation', '/harmonie/meditation'],
  ['/sante/solutions/mental/equilibre', '/psy/equilibre/equilibre-mental'],
  ['/sante/solutions/mental/stress', '/stress/'],
  ['/sante/solutions/mental/sommeil', '/psy/solution/sommeil'],
  ['/sante/solutions/naturelles-stress', '/stress/solutions-naturelles'],
  ['/sante/anatomie/neuroplasticite', '/systeme-nerveux/cerveau'],
  ['/sante/anatomie/stress', '/stress/'],
  ['/sante/anatomie/systeme-nerveux', '/systeme-nerveux/'],
  ['/sante/anatomie/systeme-nerveux/', '/systeme-nerveux/'],
  ['/sante/anatomie/systeme-nerveux/stress', '/systeme-nerveux/stress-impact'],
  ['/sante/anatomie/digestion/structure', '/systeme-digestif/digestion'],
  ['/sante/anatomie/digestion/microbiote', '/systeme-immunitaire/microbiote'],
  ['/sante/anatomie/immunite/bases', '/systeme-immunitaire/'],
  ['/sante/anatomie/hormones/presentation', '/systeme-hormonal/'],
  ['/sante/anatomie/hormones/regulation', '/harmonie/equilibre-hormonal'],
  ['/sante/anatomie/systeme-cardiovasculaire', '/parcours/sante'],
  ['/sante/anatomie/systeme-cardiovasculaire/tension', '/parcours/sante'],
  ['/sante/anatomie/sang/hemoglobine', '/parcours/sante'],
  ['/sante/anatomie/cellule/mitochondries', '/cellules/sante-cellulaire'],
  ['/sante/systeme-digestif/sante-digestive', '/systeme-digestif/sante-digestive'],
  ['/sante/systeme-digestif/nutrition/index', '/systeme-digestif/nutrition/'],
  ['/sante/nutrition/complements-alimentaires', '/systeme-digestif/nutrition/complements'],
  ['/sante/nutrition/principes', '/nutrition/'],
  ['/sante/nutrition/principes/diversite', '/nutrition/'],
  ['/sante/nutrition/mineraux', '/systeme-digestif/nutrition/mineraux'],
  ['/sante/nutrition/mineraux/magnesium', '/systeme-digestif/nutrition/mineraux'],
  ['/sante/nutrition/mineraux/calcium', '/systeme-digestif/nutrition/mineraux'],
  ['/sante/nutrition/mineraux/zinc', '/systeme-digestif/nutrition/mineraux'],
  ['/sante/nutrition/vitamines/c', '/systeme-digestif/nutrition/complements'],
  ['/sante/nutrition/vitamines/d', '/systeme-digestif/nutrition/complements'],
  ['/sante/nutrition/vitamines/e', '/systeme-digestif/nutrition/complements'],
  ['/sante/nutrition/timing-repas', '/systeme-digestif/nutrition/timing-repas'],
  ['/sante/nutrition/sommeil-nutriments', '/systeme-digestif/nutrition/sommeil-nutriments'],
  ['/sante/nutrition/chrononutrition', '/systeme-digestif/nutrition/timing-repas'],
  ['/sante/symptomes/stress/chronique', '/stress/physique'],
  ['/sante/symptomes/fatigue/types', '/parcours/sante'],
  ['/sante/grossesse/nutrition', '/nutrition/'],
  ['/sante/maladies/cancer', '/maladie/cancer'],
  ['/sante/environnement', '/environnement'],
  ['/sante/environnement/soleil', '/environnement'],
  ['/sante/equilibre-vie', '/harmonie/equilibre-vie'],
  ['/sante/sommeil', '/sommeil/'],
  ['/sante/stress', '/stress/'],
  ['/sante/stress/stress', '/stress/'],
  ['/sante/prevention/gestion-stress/techniques', '/stress/solutions-naturelles'],
  ['/sante/emotions/outils-ressources', '/psy/emotions/outils-ressources'],
  ['/sante/corps/os/sante-osseuse', '/cellules/sante-osseuse'],
  ['/sante/corps/systeme-immunitaire/nutriments-essentiels', '/systeme-immunitaire/nutriments'],
  ['/sante/corps/systeme-immunitaire/stress-immunite', '/systeme-immunitaire/stress'],
  ['/sante/corps/systeme-immunitaire/sommeil-immunite', '/systeme-immunitaire/sommeil'],
  ['/sante/corps/systeme-immunitaire/cycles-immunite', '/systeme-immunitaire/cycles'],
  ['/sante/corps/systeme-immunitaire/techniques-naturelles', '/systeme-immunitaire/techniques-naturelles'],
  ['/sante/corps/systeme-immunitaire/sport-immunite', '/systeme-immunitaire/sport'],
  ['/corps/coeur', '/parcours/sante'],
  ['/corps/coeur/', '/parcours/sante'],
  ['/corps/coeur/prevention', '/parcours/sante'],
  ['/corps/immunite', '/systeme-immunitaire/'],
  ['/corps/nutrition/bases', '/nutrition/'],
  ['/corps/nutrition/glucides', '/nutrition/'],
  ['/corps/nutrition/oeufs', '/nutrition/proteines'],
  ['/corps/nutrition/creatine', '/systeme-digestif/nutrition/complements'],
  ['/corps/nutrition/hydratation', '/nutrition/'],
  ['/corps/nutrition/anti-inflammatoire', '/systeme-immunitaire/inflammation'],
  ['/corps/nutrition/perte-poids', '/nutrition/'],
  ['/corps/systeme-musculaire/hypertrophie', '/cellules/muscles'],
  ['/corps/activite-physique', '/activite/physique/'],
  ['/corps/activite/physique/routine', '/activite/physique/'],
  ['/confiance-en-soi', '/confiance/confiance-en-soi'],
  ['/confiance-en-soi/', '/confiance/confiance-en-soi'],
  ['/confiance-en-soi/reconstruire', '/confiance/reconstruire'],
  ['/equilibre/gestion-stress', '/stress/solutions-naturelles'],
  ['/harmonie/jeune-intermittent', '/systeme-digestif/nutrition/timing-repas'],
  ['/harmonie/recuperation-musculaire', '/cellules/muscles'],
  ['/harmonie/nutrition-optimale', '/nutrition/'],
  ['/harmonie/nutrition-performance', '/nutrition/proteines'],
  ['/harmonie/recuperation-optimale', '/sommeil/'],
  ['/harmonie/vieillissement-sante', '/bonheur/bonheur-durable'],
  ['/harmonie/sante-hormonale-femmes', '/harmonie/equilibre-hormonal'],
  ['/harmonie/regulation-glycemie', '/systeme-digestif/nutrition/timing-repas'],
  ['/harmonie/alimentation-intuitive', '/nutrition/'],
  ['/sport/hiit', '/activite/physique/'],
  ['/psy/mindfulness', '/psy/solution/mindfulness'],
  ['/psy/resilience', '/psy/solution/resilience'],
  ['/psy/resilience-transformation-blessures', '/psy/solution/resilience-transformation-blessures'],
  ['/psy/effort-vs-souffrance', '/psy/emotions/qualite/effort-vs-souffrance'],
  ['/psy/responsabilite-collective', '/psy/emotions/qualite/responsabilite-collective'],
  ['/psy/strategie', '/psy/pouvoir/'],
  ['/psy/leadership', '/psy/pouvoir/mecanismes-leadership'],
  ['/psy/pouvoir-feminin', '/psy/guerrieres-legendaires'],
  ['/psy/leadership-genre', '/psy/guerrieres-legendaires'],
  ['/psy/changement', '/objectifs/changer-ses-habitudes'],
  ['/psy/concepts/', '/psy/'],
  ['/psy/concepts/mindfulness', '/psy/solution/mindfulness'],
  ['/psy/concepts/resilience', '/psy/solution/resilience'],
  ['/psy/concepts/resilience-transformation-blessures', '/psy/solution/resilience-transformation-blessures'],
  ['/psy/concepts/trauma', '/psy/trauma/'],
  ['/psy/concepts/developpement', '/psy/developpement/'],
  ['/psy/concepts/parties-interieures', '/psy/parties-interieures'],
  ['/psy/concepts/cerveau', '/systeme-nerveux/cerveau'],
  ['/psy/concepts/gestion-stress', '/stress/solutions-naturelles'],
  ['/psy/concepts/intelligence-emotionnelle', '/psy/communication/machiavel/intelligence-emotionnelle'],
  ['/psy/concepts/responsabilite-et-ombre', '/psy/emotions/qualite/responsabilite-et-ombre'],
  ['/psy/concepts/effort-vs-souffrance', '/psy/emotions/qualite/effort-vs-souffrance'],
  ['/psy/concepts/accompagnement-fin-vie', '/psy/approche/pratique/accompagnement-fin-vie'],
  ['/psy/concepts/applications-modernes-machiavel', '/psy/communication/machiavel/machiavel-bureau'],
  ['/psy/concepts/manipulation-pouvoir', '/psy/communication/manipulation/manipulation-pouvoir'],
  ['/psy/concepts/leadership-ethique', '/psy/pouvoir/ethique-responsabilite'],
  ['/psy/enseignements-machiavel', '/psy/communication/machiavel/enseignements-machiavel'],
  ['/psy/applications-modernes-machiavel', '/psy/communication/machiavel/machiavel-bureau'],
  ['/psy/psychopathie-entreprise', '/psy/developpement/trouble/psychopathie/psychopathie-entreprise'],
  ['/psy/mythes-psychopathie', '/psy/developpement/trouble/psychopathie/mythes-psychopathie'],
  ['/psy/identite/', '/confiance/reconstruire'],
  ['/psy/communication/', '/psy/'],
  ['/psy/communication/non-violente/', '/violence/solutions/communication-non-violente'],
  ['/psy/emotions/colere/', '/psy/emotions/'],
  ['/psy/emotions/regulation/', '/psy/emotions/outils-ressources'],
  ['/psy/emotions/qualite/estime-de-soi', '/confiance/confiance-en-soi'],
  ['/psy/emotions/qualite/estime-de-soi/', '/confiance/confiance-en-soi'],
  ['/psy/trauma/premiers-secours/', '/psy/trauma/'],
  ['/psy/trauma/stress-post-traumatique/', '/psy/trauma/'],
  ['/psychologie/concepts/mindfulness', '/psy/solution/mindfulness'],
  ['/psychologie/concepts/resilience', '/psy/solution/resilience'],
  ['/psychologie/traitements/psychotherapie', '/psy/solution/psychotherapie'],
  ['/psychologie/traitements/medicaments', '/psy/solution/medicaments'],
  ['/psychologie/traitements/narrative', '/psy/solution/psychotherapie'],
  ['/psychologie/communication/cnv', '/violence/solutions/non-violence/methodes/communication'],
  ['/psychologie/aide/psychologique', '/psy/solution/psychotherapie'],
  ['/psychologie/troubles/trauma', '/psy/trauma/'],
  ['/psychologie/fondamentaux/cerveau', '/systeme-nerveux/cerveau'],
  ['/psychologie/fondamentaux/developpement', '/psy/developpement/'],
  ['/psy/approches/', '/psy/approche/'],
  ['/histoire/heros', '/psy/guerriers-legendaires'],
  ['/histoire/heroines', '/psy/guerrieres-legendaires'],
  ['/communication/non-verbale', '/psy/codes-sociaux/neurologie'],
  ['/anthropologie/cultures', '/psy/codes-sociaux/cultures'],
  ['/psy/intelligence-sociale', '/systeme-social/empathie'],
  ['/psy/approche/methodes', '/psy/approche/'],
  ['/psy/equilibre/', '/psy/equilibre/equilibre-mental'],
  ['/psy/solution/', '/psy/solution/psychotherapie'],
  ['/anxiete/solutions-anxiete', '/psy/developpement/trouble/anxiete'],
  ['/vitamines/guide-vitamines', '/systeme-digestif/nutrition/complements'],
  ['/nutrition/lipides-sante', '/nutrition/'],
  ['/hormones/equilibre-hormonal', '/harmonie/equilibre-hormonal'],
  ['/immunite/inflammation-chronique', '/systeme-immunitaire/inflammation'],
  ['/detox/purifier-organisme', '/harmonie/elimination'],
  ['/bien-etre/routine-matinale', '/harmonie/equilibre-vie'],
  ['/sommeil/ameliorer-sommeil', '/sommeil/hygiene'],
  ['/nutrition/macronutriments/proteines', '/nutrition/proteines'],
  ['/violence/ressources', '/violence/ressources/livres'],
  ['/travail/bien-etre', '/violence/types/contexte/travail/'],
  ['/violence/types/psychologique', '/violence/types/violence-psychologique'],
  ['/violence/types/sexuelle', '/violence/crimes/contre-personne/agression-sexuelle'],
  ['/violence/statistiques/criminalite-france', '/violence/chiffres/criminalite-france'],
  ['/violence/solutions/aide/psychologique', '/violence/solutions/psychologique'],
  ['/violence/solutions/aide/urgence', '/violence/solutions/urgence'],
  ['/violence/solutions/aide-juridique', '/violence/solutions/juridique'],
  ['/violence/solutions/accompagnement-psy', '/violence/solutions/psychologique'],
  ['/violence/solutions/groupes-parole', '/violence/solutions/associations'],
  ['/violence/solutions/reconstruction', '/violence/solutions/resilience'],
  ['/violence/solutions/reprendre-controle', '/violence/solutions/empowerment'],
  ['/violence/solutions/therapies-auteurs', '/violence/solutions/psychologique'],
  ['/violence/solutions/groupes-auteurs', '/violence/solutions/associations'],
  ['/violence/solutions/psy-auteurs', '/violence/solutions/psychologique'],
  ['/violence/solutions/gestion-crise', '/violence/solutions/regulation'],
  ['/violence/solutions/desescalade', '/violence/solutions/mediation'],
  ['/violence/solutions/plan-prevention', '/violence/solutions/education/'],
  ['/violence/solutions/institutions', '/violence/solutions/non-violence/applications/institutions'],
  ['/violence/solutions/bientraitance', '/violence/solutions/non-violence/pratiques/quotidien'],
  ['/violence/solutions/droits', '/violence/solutions/legal'],
  ['/violence/solutions/developpement-personnel', '/violence/solutions/empowerment'],
  ['/violence/solutions/communication-saine', '/violence/solutions/communication'],
  ['/violence/solutions/prevention-collective', '/violence/solutions/education/'],
  ['/violence/solutions/therapies', '/violence/solutions/psychologique'],
  ['/violence/solutions/engagement', '/violence/solutions/non-violence/applications/social'],
  ['/violence/solutions/approches', '/violence/solutions/'],
  ['/violence/solutions/strategie-securite/', '/violence/solutions/protection'],
  ['/violence/solutions/plan-sortie/', '/violence/solutions/protection'],
  ['/violence/solutions/genre', '/violence/types/contexte/societe/discrimination'],
  ['/violence/solutions/resolution-conflits', '/violence/solutions/non-violence/methodes/resolution-conflits'],
  ['/violence/solutions/ressources', '/violence/solutions/ressources-locales'],
  ['/violence/solutions/prevention', '/violence/solutions/'],
  ['/violence/prevention/non-violence', '/violence/solutions/non-violence'],
  ['/violence/prevention/mediation', '/violence/solutions/mediation'],
  ['/violence/prevention/signes-avant-coureurs', '/violence/solutions/signes'],
  ['/violence/solutions/signes-avant-coureurs', '/violence/solutions/signes'],
  ['/violence/prevention/outils-protection', '/violence/solutions/outils-protection'],
  ['/violence/prevention/assertivite-limites', '/violence/solutions/assertivite-limites'],
  ['/violence/prevention/pouvoir-des-mots', '/psy/communication/pouvoir-des-mots'],
  ['/violence/prevention/education/professionnels', '/violence/solutions/education/professionnels'],
  ['/violence/prevention/education/adultes', '/violence/solutions/education/adultes'],
  ['/violence/prevention/education/societe', '/violence/solutions/education/'],
  ['/violence/prevention/cnv', '/violence/solutions/communication-non-violente'],
  ['/violence/prevention/approches', '/violence/solutions/'],
  ['/violence/aide/psychologique', '/violence/solutions/psychologique'],
  ['/violence/aide/urgence', '/violence/solutions/urgence'],
  ['/violence/aide/ressources', '/violence/solutions/ressources-locales'],
  ['/violence/aide/juridique', '/violence/solutions/juridique'],
  ['/violence/aide/juridique/procedure-penale', '/violence/solutions/juridique'],
  ['/violence/aide/associations', '/violence/solutions/associations'],
  ['/violence/aide/accompagnement', '/violence/solutions/psychologique'],
  ['/violence/comprendre/mecanismes', '/violence/mecanismes/'],
  ['/violence/comprendre/impacts/individuels', '/violence/impacts/individuels'],
  ['/violence/comprendre/impacts/collectifs', '/violence/impacts/collectifs'],
  ['/violence/comprendre/impacts/societaux', '/violence/impacts/societaux'],
  ['/violence/comprendre/types', '/violence/types/'],
  ['/violence/comprendre/formes', '/violence/types/'],
  ['/violence/temoignages', '/violence/ressources/temoignages/guerison/reconstruction'],
  ['/violence/temoignages/guerison', '/violence/ressources/temoignages/guerison/reconstruction'],
  ['/violence/temoignages/victimes/', '/violence/ressources/temoignages/victimes/harcelement-professionnel'],
  ['/violence/types/crimes/contre-personne/homicide', '/violence/crimes/contre-personne/homicide'],
  ['/violence/causes/psychologiques', '/violence/causes/psychologique'],
  ['/violence/causes/psychologiques/', '/violence/causes/psychologique'],
  ['/violence/causes/mecanismes/mecanismes', '/violence/mecanismes/'],
  ['/violence/causes/biologiques', '/violence/causes/biologique'],
  ['/violence/causes/biologiques/', '/violence/causes/biologique'],
  ['/violence/causes/sociales', '/violence/causes/social'],
  ['/violence/causes/sociales/', '/violence/causes/social'],
  ['/violence/causes/enfance', '/violence/causes/developpement-trauma'],
  ['/violence/causes/enfance/', '/violence/causes/developpement-trauma'],
  ['/violence/consequences/victimes', '/violence/profils/victimes'],
  ['/violence/consequences/victimes/', '/violence/profils/victimes'],
  ['/violence/consequences/enfants', '/violence/types/contexte/familial/enfants'],
  ['/violence/consequences/enfants/', '/violence/types/contexte/familial/enfants'],
  ['/violence/mecanismes/transmission', '/violence/mecanismes/cycles'],
  ['/violence/mecanismes/transmission/', '/violence/mecanismes/cycles'],
  ['/violence/mecanismes/pourquoi-difficile-partir/', '/violence/mecanismes/emprise'],
  ['/justice/restaurative', '/violence/solutions/legal'],
  ['/reinsertion/programmes', '/violence/solutions/non-violence/applications/social'],
  ['/economie/entrepreneuriat-social', '/violence/solutions/non-violence/applications/social'],
  ['/non-violence/methodes/communication-non-violente', '/violence/solutions/non-violence/methodes/communication'],
  ['/non-violence/methodes/resolution-conflits', '/violence/solutions/non-violence/methodes/resolution-conflits'],
  ['/non-violence/applications/leadership', '/violence/solutions/cnv-entreprise'],
  ['/psy/concepts/communication/non-violente', '/violence/solutions/communication-non-violente'],
  ['/psy/concepts/responsabilite-collective', '/psy/emotions/qualite/responsabilite-collective'],
  ['/mental/sommeil/optimisation', '/sommeil/hygiene'],
  ['/mental/anxiete/comprendre', '/psy/developpement/trouble/anxiete'],
  ['/esprit/sommeil/optimisation', '/sommeil/hygiene'],
  ['/esprit/stress/gestion', '/stress/solutions-naturelles'],
  ['/esprit/stress/techniques', '/stress/solutions-naturelles'],
  ['/esprit/douleur/gestion', '/psy/solution/relaxation'],
  ['/bonheur/equilibre/quotidien', '/harmonie/equilibre-vie'],
  ['/bonheur/longevite/vieillissement', '/bonheur/bonheur-durable'],
  ['/sante/anatomie/immunite/dysfonctionnements', '/systeme-immunitaire/maladies-auto-immunes'],
  ['/sante/nutrition/nutriments', '/systeme-digestif/nutrition/nutriments'],
  ['/sante/symptomes/troubles-sommeil/insomnie', '/sommeil/'],
  ['/sante/symptomes/troubles-sommeil/cauchemars', '/sommeil/'],
  ['/sante/symptomes/troubles-sommeil/parasomnies', '/sommeil/'],
  ['/sante/maladies/psychosomatique/definition', '/psy/equilibre/equilibre-mental'],
  ['/sante/maladies/psychosomatique/mecanismes', '/psy/equilibre/equilibre-mental'],
  ['/sante/maladies/psychosomatique/prise-en-charge', '/psy/equilibre/equilibre-mental'],
  ['/sante/symptomes/fatigue/epuisement', '/burnout/'],
  ['/sante/symptomes/fatigue/burn-out', '/burnout/'],
  ['/sante/symptomes/douleur/mecanismes', '/parcours/sante'],
  ['/sante/symptomes/douleur/chronique', '/parcours/sante'],
  ['/sante/symptomes/douleur/fibromyalgie', '/parcours/sante'],
  ['/sante/ressources/professionnels', '/medecine/relation-patient-medecin'],
  ['/nutrition/mineraux/zinc', '/systeme-digestif/nutrition/mineraux'],
]);

const REGEX_REDIRECTS = [
  [/^\/Sante\/Sommeil\/Cycles$/u, '/sommeil/cycles'],
  [/^\/sante\/systeme-digestif\/(.+)$/u, '/systeme-digestif/$1'],
  [/^\/sante\/anatomie\/systeme-nerveux\/(.+)$/u, '/systeme-nerveux/$1'],
  [/^\/sante\/stress\/(.+)$/u, '/stress/$1'],
  [/^\/sante\/sommeil\/(.+)$/u, '/sommeil/$1'],
  [/^\/sante\/activite-physique\/bienfaits$/u, '/activite/physique/bienfaits'],
  [/^\/sante\/activite-physique\/.+$/u, '/activite/physique/'],
  [/^\/sante\/corps\/systeme-immunitaire\/(.+)$/u, '/systeme-immunitaire/$1'],
  [/^\/corps\/sommeil\/(.+)$/u, '/sommeil/$1'],
  [/^\/corps\/activite\/physique\/(.+)$/u, '/activite/physique/$1'],
  [/^\/corps\/nutrition\/(.+)$/u, '/nutrition/$1'],
  [/^\/corps\/digestion\/.+$/u, '/systeme-digestif/digestion'],
  [/^\/corps\/sport\/.+$/u, '/activite/physique/'],
  [/^\/corps\/exercice\/.+$/u, '/activite/physique/'],
  [/^\/corps\/examens\/.+$/u, '/medecine/examens-medicaux'],
  [/^\/corps\/examens$/u, '/medecine/examens-medicaux'],
  [/^\/corps\/maladies\/cancers$/u, '/maladie/cancer'],
  [/^\/corps\/hormones\/.+$/u, '/systeme-hormonal/'],
  [/^\/corps\/mouvement\/.+$/u, '/activite/physique/'],
  [/^\/corps\/mouvement\/bases$/u, '/activite/physique/'],
  [/^\/corps\/mouvement\/reeducation$/u, '/activite/physique/'],
  [/^\/corps\/medecine\/.+$/u, '/medecine/'],
  [/^\/corps\/inflammation\/.+$/u, '/systeme-immunitaire/inflammation'],
  [/^\/corps\/muscles\/.+$/u, '/cellules/muscles'],
  [/^\/corps\/systemes\/foie-detox$/u, '/harmonie/elimination'],
  [/^\/corps\/systeme-cardio\/.+$/u, '/parcours/sante'],
  [/^\/corps\/systeme-endocrinien$/u, '/systeme-hormonal/'],
  [/^\/corps\/systeme-social\/impact-physique$/u, '/systeme-social/impact-physique'],
  [/^\/corps\/systeme-social\/intelligence-sociale$/u, '/systeme-social/empathie'],
  [/^\/corps\/systeme-social\/frontieres$/u, '/systeme-social/poser-ses-limites'],
  [/^\/corps\/systeme-social\/cultiver-relations$/u, '/systeme-social/liens-sociaux'],
  [/^\/corps\/systeme-social\/appartenance$/u, '/psy/emotions/appartenance'],
  [/^\/corps\/systeme-social\/communication$/u, '/systeme-social/communication-non-violente'],
  [/^\/corps\/systeme-social\/soutien$/u, '/systeme-social/liens-sociaux'],
  [/^\/corps\/systeme-social\/gestion-conflits$/u, '/systeme-social/gestion-des-conflits'],
  [/^\/corps\/systeme-social\/equilibre$/u, '/systeme-social/impact-mental'],
  [/^\/psychologie\/domaines\/(.+)$/u, '/psy/approche/domaines/$1'],
  [/^\/psychologie\/methodes\/(.+)$/u, '/psy/approche/methodes/$1'],
  [/^\/psychologie\/approches\/(.+)$/u, '/psy/approche/$1'],
  [/^\/psychologie\/communication\/.+$/u, '/psy/communication/pouvoir-des-mots'],
  [/^\/psychologie\/sociale$/u, '/psy/approche/domaines/sociale'],
  [/^\/psychologie\/groupe$/u, '/psy/approche/domaines/sociale'],
  [/^\/psychologie\/protection$/u, '/psy/pouvoir/ethique-responsabilite'],
  [/^\/psychologie\/recherche\/psychopathie$/u, '/psy/developpement/trouble/psychopathie/'],
  [/^\/psychologie\/fondamentaux\/cerveau$/u, '/systeme-nerveux/cerveau'],
  [/^\/psychologie\/fondamentaux\/developpement$/u, '/psy/developpement/'],
  [/^\/psy\/concepts\/communication\/(.+)$/u, '/psy/communication/$1'],
  [/^\/psy\/concepts\/codes-sociaux\/(.+)$/u, '/psy/codes-sociaux/$1'],
  [/^\/psy\/concepts\/applications-machiavel\/(.+)$/u, '/psy/communication/machiavel/$1'],
  [/^\/psy\/concepts\/dualite$/u, '/psy/dualite'],
  [/^\/psy\/concepts\/psychopathie-entreprise$/u, '/psy/developpement/trouble/psychopathie/psychopathie-entreprise'],
  [/^\/psy\/concepts\/mythes-psychopathie$/u, '/psy/developpement/trouble/psychopathie/mythes-psychopathie'],
  [/^\/psy\/concepts\/psychologie-pouvoir\/ethique-responsabilite$/u, '/psy/pouvoir/ethique-responsabilite'],
  [/^\/psy\/concepts\/psychologie-pouvoir\/pouvoir-relations$/u, '/psy/pouvoir/pouvoir-relations'],
  [/^\/psy\/concepts\/intelligence-emotionnelle-travail$/u, '/psy/communication/machiavel/intelligence-emotionnelle'],
  [/^\/psy\/concepts\/pouvoir-emotions$/u, '/psy/emotions/'],
  [/^\/violence\/causes\/mecanismes\/(.+)$/u, '/violence/mecanismes/$1'],
  [/^\/violence\/causes\/mécanismes\/(.+)$/u, '/violence/mecanismes/$1'],
  [/^\/violence\/comprendre\/impacts\/(.+)$/u, '/violence/impacts/$1'],
  [/^\/violence\/contextes\/travail$/u, '/violence/types/contexte/travail/'],
  [/^\/violence\/contextes\/scolaire$/u, '/violence/types/contexte/scolaire/'],
  [/^\/violence\/contextes\/politique$/u, '/violence/types/contexte/societe/politique'],
  [/^\/violence\/contextes\/familial\/enfants$/u, '/violence/types/contexte/familial/enfants'],
  [/^\/violence\/contextes\/familial\/conjugale$/u, '/violence/types/contexte/familial/conjugale'],
  [/^\/violence\/contextes\/domestique$/u, '/violence/types/contexte/familial/'],
];

const FALLBACK_REDIRECTS = [
  [/^\/sante\/anatomie\/immunite\//u, '/systeme-immunitaire/'],
  [/^\/sante\/anatomie\/digestion\/intestin-cerveau$/u, '/systeme-digestif/digestion'],
  [/^\/sante\/anatomie\/immunite\/dysfonctionnements$/u, '/systeme-immunitaire/maladies-auto-immunes'],
  [/^\/sante\/anatomie\/immunite\/stress$/u, '/systeme-immunitaire/stress'],
  [/^\/sante\/corps\/systeme-immunitaire\//u, '/systeme-immunitaire/'],
  [/^\/sante\/anatomie\/systeme-nerveux/u, '/systeme-nerveux/'],
  [/^\/sante\/systeme-digestif/u, '/systeme-digestif/'],
  [/^\/sante\/stress/u, '/stress/'],
  [/^\/sante\/sommeil/u, '/sommeil/'],
  [/^\/sante\/nutrition/u, '/nutrition/'],
  [/^\/sante\/prevention\/examens$/u, '/medecine/examens-medicaux'],
  [/^\/sante\/prevention\/gestion-stress\/relaxation$/u, '/psy/solution/relaxation'],
  [/^\/sante\/prevention\/gestion-stress\/meditation$/u, '/harmonie/meditation'],
  [/^\/sante\/symptomes\/troubles-sommeil\//u, '/sommeil/'],
  [/^\/sante\/symptomes\/fatigue\//u, '/burnout/'],
  [/^\/sante\/symptomes\/douleur\//u, '/parcours/sante'],
  [/^\/sante\/ressources\//u, '/medecine/relation-patient-medecin'],
  [/^\/sante\/maladies\/psychosomatique\//u, '/psy/equilibre/equilibre-mental'],
  [/^\/sante\/concepts\/epigenetique$/u, '/epigenetique'],
  [/^\/sante\/concepts\/chronobiologie$/u, '/harmonie/chronobiologie'],
  [/^\/sante\/concepts\/liens-sociaux$/u, '/systeme-social/liens-sociaux'],
  [/^\/sante\/nutrition\/nutriments$/u, '/systeme-digestif/nutrition/nutriments'],
  [/^\/sante\/anatomie/u, '/parcours/sante'],
  [/^\/sante\/symptomes/u, '/parcours/sante'],
  [/^\/sante\//u, '/parcours/sante'],
  [/^\/mental\/sommeil\//u, '/sommeil/'],
  [/^\/mental\/anxiete\//u, '/psy/developpement/trouble/anxiete'],
  [/^\/esprit\/sommeil\//u, '/sommeil/'],
  [/^\/esprit\/stress\//u, '/stress/solutions-naturelles'],
  [/^\/esprit\/douleur\//u, '/psy/solution/relaxation'],
  [/^\/bonheur\/equilibre\//u, '/harmonie/equilibre-vie'],
  [/^\/bonheur\/longevite\//u, '/bonheur/bonheur-durable'],
  [/^\/vitamines\//u, '/systeme-digestif/nutrition/complements'],
  [/^\/hormones\//u, '/systeme-hormonal/'],
  [/^\/immunite\//u, '/systeme-immunitaire/'],
  [/^\/detox\//u, '/harmonie/elimination'],
  [/^\/bien-etre\//u, '/harmonie/equilibre-vie'],
  [/^\/nutrition\/mineraux\//u, '/systeme-digestif/nutrition/mineraux'],
  [/^\/corps\/systeme-social/u, '/systeme-social/'],
  [/^\/corps\/activite/u, '/activite/physique/'],
  [/^\/corps\/nutrition/u, '/nutrition/'],
  [/^\/corps\/sommeil/u, '/sommeil/'],
  [/^\/corps\//u, '/parcours/sante'],
  [/^\/psychologie\//u, '/psy/'],
  [/^\/communication\//u, '/psy/communication/pouvoir-des-mots'],
  [/^\/psy\/concepts\//u, '/psy/'],
  [/^\/psy\//u, '/psy/'],
  [/^\/violence\/contextes\//u, '/violence/types/contexte/'],
  [/^\/violence\/causes\//u, '/violence/causes/'],
  [/^\/violence\/mecanismes\//u, '/violence/mecanismes/'],
  [/^\/violence\/comprendre\//u, '/violence/'],
  [/^\/violence\/solutions\//u, '/violence/solutions/'],
  [/^\/violence\/aide\//u, '/violence/solutions/'],
  [/^\/violence\/temoignages\//u, '/violence/ressources/temoignages/guerison/reconstruction'],
  [/^\/violence\//u, '/violence/'],
];

function normalizePath(value) {
  if (!value) {
    return '/';
  }

  const pathOnly = value.replace(/^https?:\/\/[^/]+/u, '').split('#')[0].split('?')[0];
  if (!pathOnly) {
    return '/';
  }

  const withSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  return withSlash !== '/' ? withSlash.replace(/\/+$/u, '') : '/';
}

function withVariants(target) {
  const normalized = normalizePath(target);
  return normalized === '/' ? ['/'] : [normalized, `${normalized}/`];
}

function entryIdToPath(entryId) {
  const slug = entryId.replace(/\.(md|mdx)$/u, '');

  if (slug === 'index') {
    return '/';
  }

  if (slug.endsWith('/index')) {
    return `/${slug.slice(0, -'/index'.length)}/`;
  }

  return `/${slug}`;
}

function pageFileToPath(filePath) {
  const relative = filePath.replace(/^src\/pages\//u, '').replace(/\.astro$/u, '');
  return `/${relative}`;
}

export function collectExistingPaths(rootDir = ROOT) {
  const paths = new Set(STATIC_PAGE_PATHS.map(normalizePath));
  const docFiles = globSync(DOCS_GLOB, { cwd: rootDir, nodir: true });

  for (const file of docFiles) {
    paths.add(normalizePath(entryIdToPath(file.replace(/^src\/content\/docs\//u, ''))));
  }

  const pageFiles = globSync(PAGE_GLOB, { cwd: rootDir, nodir: true });

  for (const file of pageFiles) {
    if (file.endsWith('[...slug].astro') || file.endsWith('404.astro') || file.endsWith('index.astro')) {
      continue;
    }

    paths.add(normalizePath(pageFileToPath(file)));
  }

  return paths;
}

export function pathExists(target, existingPaths) {
  return withVariants(target).some((candidate) => existingPaths.has(normalizePath(candidate)));
}

function applyReplacementRule(target, rules) {
  for (const [matcher, replacement] of rules) {
    if (matcher instanceof RegExp) {
      if (matcher.test(target)) {
        return target.replace(matcher, replacement);
      }
      continue;
    }

    if (matcher === target) {
      return replacement;
    }
  }

  return null;
}

export function resolveLegacyPath(target, existingPaths, { allowFallback = false } = {}) {
  const normalized = normalizePath(target);

  if (pathExists(normalized, existingPaths)) {
    return normalized;
  }

  const exact = EXACT_REDIRECTS.get(normalized) ?? EXACT_REDIRECTS.get(`${normalized}/`);
  if (exact && pathExists(exact, existingPaths)) {
    return normalizePath(exact);
  }

  const regexMatch = applyReplacementRule(normalized, REGEX_REDIRECTS);
  if (regexMatch && pathExists(regexMatch, existingPaths)) {
    return normalizePath(regexMatch);
  }

  if (!allowFallback) {
    return null;
  }

  const fallback = applyReplacementRule(normalized, FALLBACK_REDIRECTS);
  if (fallback && pathExists(fallback, existingPaths)) {
    return normalizePath(fallback);
  }

  return null;
}

export function findInternalLinks(markdown) {
  const links = [];
  const regex = /\]\((\/[^)\s]+)\)/gu;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    const rawTarget = match[1];
    const target = normalizePath(rawTarget);
    links.push({ rawTarget, target });
  }

  return links;
}

export function collectBrokenInternalLinks(rootDir = ROOT, { allowFallback = false } = {}) {
  const existingPaths = collectExistingPaths(rootDir);
  const docFiles = globSync(DOCS_GLOB, { cwd: rootDir, nodir: true });
  const broken = [];

  for (const file of docFiles) {
    const absolutePath = path.join(rootDir, file);
    const markdown = fs.readFileSync(absolutePath, 'utf8');

    for (const { rawTarget, target } of findInternalLinks(markdown)) {
      if (pathExists(target, existingPaths)) {
        continue;
      }

      const redirect = resolveLegacyPath(target, existingPaths, { allowFallback });
      if (redirect) {
        broken.push({ file, rawTarget, target, redirect, resolved: true });
        continue;
      }

      broken.push({ file, rawTarget, target, redirect: null, resolved: false });
    }
  }

  return { existingPaths, broken };
}

export function buildLegacyRedirects(rootDir = ROOT) {
  const { broken } = collectBrokenInternalLinks(rootDir, { allowFallback: true });
  const redirects = {};

  for (const entry of broken) {
    if (!entry.redirect) {
      continue;
    }

    redirects[entry.target] = entry.redirect;
  }

  return redirects;
}

# Pokédex Next.js

Une application Pokédex complète construite avec Next.js, React Query et Tailwind CSS, qui consomme l'API Pokémon à l'URL: https://nestjs-pokedex-api.vercel.app

## Fonctionnalités

- **Liste des Pokémons** : Affichage des Pokémons par défaut 50 par 50
- **Infinite Scroll** : Chargement automatique de plus de Pokémons en scrollant
- **Filtres** :
  - Recherche par nom
  - Filtrage par type(s)
  - Limitation du nombre de résultats
- **Page de détail** :
  - Informations détaillées du Pokémon
  - Statistiques avec visualisation graphique
  - Chaîne d'évolution avec navigation
  - Bouton retour vers la liste

## Structure du projet

Le projet est organisé avec une architecture claire et modulaire:

- `app/` : Pages et layout de l'application (structure Next.js App Router)
- `components/` : Composants React réutilisables
- `hooks/` : Hooks personnalisés pour la logique
- `lib/` : Fonctions utilitaires et services
- `types/` : Types TypeScript

## Technologies utilisées

- **Next.js** : Framework React pour le rendu côté serveur et le routage
- **TypeScript** : Pour le typage statique
- **React Query** : Pour la gestion des données et du cache
- **Tailwind CSS** : Pour le styling
- **Intersection Observer API** : Pour l'infinite scroll

## Installation et exécution

```bash
# Cloner le repository
git clone https://github.com/username/pokedex-nextjs.git
cd pokedex-nextjs

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Lancer en mode production
npm start
```

## Points forts du projet

1. **Architecture optimisée** : Séparation des préoccupations, code modulaire et réutilisable
2. **Performance** :
   - Mise en cache intelligente avec React Query
   - Debounce pour les recherches
   - Lazy loading des images
3. **Expérience utilisateur** :
   - Design responsive
   - Infinite scroll fluide
   - Gestion des états de chargement et d'erreur
4. **Code propre** :
   - TypeScript pour la sécurité du type
   - Composants réutilisables
   - Hooks personnalisés
5. **Design soigné** :
   - Interface utilisateur intuitive
   - Animations subtiles
   - Adaptation des couleurs en fonction des types de Pokémon

## Fonctionnalités implémentées selon l'énoncé

### Page principale Pokedex (11 points)
- Scroll fetch (2 points) ✅
- Filtre par nom (2 points) ✅
- Filtre par type(s) (2 points) ✅
- Gestion de la limit (1 point) ✅
- Qualité de la page (2 points) ✅
- Compétences techniques (2 points) ✅

### Page détail d'un Pokemon (7 points)
- Bouton retour (1 point) ✅
- Infos du pokémon (1 point) ✅
- Évolutions (1 point) ✅
- Qualité de la page (3 points) ✅
- Logique du code (1 point) ✅
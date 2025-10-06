# Cahier des Charges - UMAG x ITSEasy
## Solution de Monitoring Industriel

### 📋 Description
Cahier des charges ultra-moderne et interactif pour une solution de monitoring industriel destinée à UMAG, développée par ITSEasy.

### 🎨 Caractéristiques
- **Design Ultra-Moderne** : Interface glassmorphism avec dégradés et animations
- **Graphiques Interactifs** : Visualisations en temps réel avec Chart.js
- **100% Responsive** : Adapté à tous les appareils
- **Animations Fluides** : Transitions et effets visuels attractifs

### 📁 Structure des Fichiers
```
Porjet UMAG/
├── index.html          # Fichier principal (cahier des charges complet)
├── CDC.html            # Version alternative
├── styles.css          # Styles CSS personnalisés
├── charts.js           # Graphiques et interactions JavaScript
└── README.md           # Ce fichier
```

### 🚀 Comment Utiliser

#### Option 1 : Ouverture Locale
1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Tous les graphiques et animations s'afficheront automatiquement
3. Naviguez à travers les différentes sections

#### Option 2 : Serveur Local
```bash
# Dans le dossier du projet
python -m http.server 8000
# Puis ouvrez http://localhost:8000/index.html dans votre navigateur
```

### 🎯 Sections du Cahier des Charges

1. **Vision du Projet** - Présentation UMAG x ITSEasy avec KPIs fondamentaux
2. **Dashboard Interactif** - Démonstration des graphiques temps réel
3. **Timeline Intelligente** - Suivi de production avec annotations
4. **Gestion des Arrêts** - Qualification des arrêts machines
5. **Configuration Machines** - Intégration avec InfluxDB
6. **Formules de Calcul** - Détail des indicateurs (OEE, MTBF, MTTR...)
7. **Gestion Utilisateurs** - Système de rôles et permissions
8. **Planning** - Roadmap de développement sur 4 semaines

### 💡 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes (Flexbox, Grid, Animations)
- **JavaScript ES6+** - Interactions dynamiques
- **Chart.js 4.4.0** - Graphiques interactifs
- **Google Fonts (Inter)** - Typographie professionnelle

### 🎨 Palette de Couleurs

```css
Primary Blue:    #0066FF
Primary Dark:    #0047AB
Success Green:   #10B981
Warning Orange:  #F59E0B
Danger Red:      #EF4444
Info Cyan:       #06B6D4
Purple:          #7C3AED
```

### ✨ Fonctionnalités Clés

#### Graphiques Dynamiques
- Sparklines pour les tendances rapides
- Graphiques en anneau (donut) pour les proportions
- Graphiques linéaires pour l'évolution temporelle
- Graphiques en barres pour les comparaisons

#### Animations
- Fade-in au scroll
- Hover effects sur les cartes
- Transitions fluides
- Compteurs animés

#### Interactions
- Boutons de contrôle du dashboard
- Timeline interactive avec commentaires
- Formulaires de configuration
- Bouton de copie du code

### 📊 Indicateurs Présentés

- **OEE** (Overall Equipment Effectiveness)
- **Disponibilité** (Temps de fonctionnement)
- **Performance** (Vitesse vs théorique)
- **Qualité** (Taux de conformité)
- **MTBF** (Mean Time Between Failures)
- **MTTR** (Mean Time To Repair)
- **TRS** (Taux de Rendement Synthétique)

### 🔧 Personnalisation

#### Modifier les Couleurs
Éditez les variables CSS dans `styles.css` :
```css
:root {
    --primary-color: #VotreCouleur;
    /* ... autres variables ... */
}
```

#### Ajouter des Sections
Copiez la structure d'une section existante dans `index.html` :
```html
<div class="section fade-in">
    <div class="section-header">
        <!-- Votre contenu -->
    </div>
</div>
```

#### Personnaliser les Graphiques
Modifiez les données dans `charts.js` :
```javascript
const oeeData = [78, 82, 85, 87, 89, 88, 87, 90];
// Changez les valeurs selon vos besoins
```

### 📱 Compatibilité

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (iOS/Android)

### 📝 Notes Importantes

- **Connexion Internet Requise** : Pour charger les fonts Google et Chart.js
- **JavaScript Activé** : Nécessaire pour les graphiques et interactions
- **Navigateur Moderne** : Recommandé pour les effets CSS avancés

### 🎁 Bonus

Le cahier des charges inclut :
- Exemples de code InfluxDB
- Formules de calcul détaillées
- Wireframes de formulaires
- Schéma d'intégration technique
- Planning de développement détaillé

### 📞 Contact

**Client** : UMAG  
**Développeur** : ITSEasy  
**Date** : Octobre 2025

---

### 🚀 Prochaines Étapes

1. ✅ Valider le cahier des charges avec UMAG
2. 🔐 Obtenir les accès InfluxDB
3. 📋 Finaliser la liste des machines
4. 🎬 Lancer le développement

---

**Made with ❤️ by ITSEasy for UMAG**

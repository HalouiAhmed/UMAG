# 🚨 POINTS CRITIQUES - Projet UMAG Monitoring Industriel

## 📋 Document de Synthèse - Points à Clarifier

**Date:** 11 Octobre 2025  
**Projet:** Solution de Monitoring Industriel UMAG x ITSEasy  
**Destinataires:** Équipe ITSEasy, Lepresta (prestataire infrastructure), Client UMAG

---

## 🔴 CRITIQUES BLOQUANTS (À clarifier avant développement)

### 1. Format et Structure du Flux de Données Client

**Problème:** Le client UMAG doit fournir un flux temps réel des données machines, mais le format n'est pas défini.

**Questions:**
- Quel est le **format exact** des données fournies par le client ? 
  - JSON via API REST ?
  - Fichier CSV périodique ?
  - Protocole industriel spécifique (OPC UA, MQTT, Modbus) ?
  - WebSocket temps réel ?
  
- Quelle est la **fréquence d'actualisation** ?
  - Temps réel (< 1 seconde) ?
  - Polling toutes les 5/10/30 secondes ?
  
- Quelle est la **structure exacte** des données ?
  - Exemple de payload JSON nécessaire
  - Liste complète des champs disponibles
  - Types de données (int, float, string, timestamp)

**Impact:** Architecture backend complète dépend de cette réponse.

**Responsable:** Client UMAG + Lepresta

---

### 2. Détection Automatique du Changement d'Article

**Problème:** Le système doit détecter quand un changement d'article est effectué sur une ligne de production pour adapter les calculs (OEE cible, vitesse théorique, seuils).

**Questions:**
- Comment le **changement d'article est-il signalé** dans le flux ?
  - Champ dédié `article_id` ou `article_code` dans chaque message ?
  - Événement spécifique "CHANGEMENT_ARTICLE" ?
  - Détection automatique par mutation de paramètres (diamètre, matière) ?
  
- Y a-t-il un **délai de stabilisation** après un changement avant de commencer les mesures ?

- Les **arrêts de changement de série** sont-ils automatiquement détectés ou saisis manuellement ?

**Impact:** Logique métier centrale du système.

**Responsable:** Client UMAG (process industriel) + Lepresta (implémentation flux)

---

### 3. Hiérarchie Lignes vs Machines - Identification des Arrêts

**Problème:** Une ligne de production contient plusieurs machines. Les KPIs sont calculés au niveau ligne, mais les arrêts doivent identifier la machine spécifique.

**Questions:**
- Dans le **flux de données**, comment identifier quelle machine d'une ligne est en arrêt ?
  - ID machine unique dans chaque message ?
  - Flux séparé par machine puis agrégation côté backend ?
  
- Les machines envoient-elles des **heartbeats** individuels ou seulement au niveau ligne ?

- En cas d'**arrêt d'une machine**, la ligne entière s'arrête ou les autres machines continuent ?
  - Si arrêt partiel, comment calculer l'OEE global de la ligne ?

**Impact:** Structure base de données et logique de calcul des KPIs.

**Responsable:** Client UMAG (process) + ITSEasy (modélisation) + Lepresta (BD)

---

### 4. Gestion des Shifts (Équipes)

**Problème:** Les filtres incluent une notion de "Shift" (3 équipes : 6h-14h, 14h-22h, 22h-6h).

**Questions:**
- Le **shift est-il fourni** dans le flux de données client ?
  - Champ dédié dans les messages ?
  - Ou calcul côté backend selon timestamp et configuration horaires ?
  
- Y a-t-il des **chevauchements** entre shifts (changement d'équipe progressif) ?

- Les **changements de shift** doivent-ils être tracés comme événements spéciaux ?

**Impact:** Logique de filtrage et agrégation des données.

**Responsable:** Client UMAG (organisation RH) + ITSEasy (implémentation)

---

## 🟠 IMPORTANTS (À clarifier en phase de développement)

### 5. Permissions Base de Données MySQL

**Problème:** Lepresta gère l'instance MySQL, mais ITSEasy développe l'API backend.

**Questions:**
- ITSEasy aura-t-il un **accès direct à MySQL** (credentials) ?
  - Ou uniquement via une **API fournie par Lepresta** ?
  
- Qui est responsable des **migrations de schéma** et des évolutions BD ?

- Quel niveau de **permissions** pour ITSEasy ? (SELECT/INSERT/UPDATE/DELETE/CREATE TABLE)

**Impact:** Architecture backend et autonomie d'ITSEasy.

**Responsable:** Lepresta + ITSEasy

---

### 6. Infrastructure et Hébergement

**Problème:** L'hébergement de la solution n'est pas défini.

**Questions:**
- Hébergement **Cloud** (AWS, Azure, GCP) ou **On-Premise** chez UMAG ?

- Si On-Premise, ITSEasy aura-t-il un **accès VPN** pour maintenance ?

- Qui gère les **sauvegardes** et la **haute disponibilité** ?

- Budget infrastructure : qui prend en charge les coûts serveurs/DB/réseau ?

**Impact:** Choix technologiques et coûts opérationnels.

**Responsable:** Client UMAG (décision) + Lepresta (mise en œuvre)

---

### 7. Définition des Types d'Arrêts

**Problème:** Les arrêts doivent être catégorisés (Planifié / Non Planifié) avec sous-catégories.

**Questions:**
- Quelles sont **toutes les catégories** d'arrêts possibles ?
  - Liste exhaustive avec exemples
  - Catégories personnalisables par le client ?
  
- Qui définit si un arrêt est **"Planifié" vs "Non Planifié"** ?
  - Détection automatique (maintenance programmée) ?
  - Qualification manuelle par opérateur ?
  - Les deux avec priorité sur manuel ?

**Impact:** Interface de qualification et logique de calcul OEE.

**Responsable:** Client UMAG (expertise métier)

---

### 8. Export PDF/Excel - Exigences de Formatage

**Problème:** Les exports admin doivent générer des fichiers Excel et PDF, mais le format exact n'est pas défini.

**Questions:**
- Quel **template exact** pour le PDF ?
  - Charte graphique UMAG (logo, couleurs, polices)
  - Sections obligatoires (graphiques, tableau, synthèse)
  
- Pour **Excel**, quelles sont les formules attendues ?
  - Calculs automatiques dans les cellules ?
  - Mise en forme conditionnelle (couleurs selon seuils) ?
  - Graphiques Excel intégrés ?

**Impact:** Développement des modules d'export.

**Responsable:** Client UMAG (validation maquette export)

---

## 🟡 CLARIFICATIONS SOUHAITABLES (Nice to have)

### 9. Seuils d'Alerte et Notifications

**Questions:**
- Le système doit-il envoyer des **notifications** en cas d'alerte OEE < seuil ?
  - Email ? SMS ? Notification in-app ?
  
- Qui reçoit les notifications ? (Admins, Chefs d'Atelier, Opérateurs concernés ?)

**Responsable:** Client UMAG

---

### 10. Historique et Rétention des Données

**Questions:**
- Combien de temps conserver les **données temps réel** ?
  - 7 jours ? 30 jours ? 1 an ?
  
- Archivage des anciennes données ? Format ? Fréquence ?

**Responsable:** Client UMAG + Lepresta (contraintes BD)

---

### 11. Multi-Site et Évolutivité

**Questions:**
- UMAG a-t-il **plusieurs sites** de production ?
  - Si oui, faut-il prévoir une architecture multi-tenant ?
  
- Évolution future : combien de **lignes de production** à terme ?
  - Impact sur scalabilité BD et performance

**Responsable:** Client UMAG (vision stratégique)

---

## 📊 Récapitulatif des Responsabilités

| Point Critique | Client UMAG | Lepresta | ITSEasy |
|----------------|-------------|----------|---------|
| Format flux données | ✅ Fournir | ✅ Implémenter | ⚠️ Consommer |
| Changement d'article | ✅ Process | ✅ Format flux | ⚠️ Logique |
| Hiérarchie lignes/machines | ✅ Définir | ✅ Modéliser BD | ⚠️ Exploiter |
| Gestion shifts | ✅ Organisation | ⚠️ Support BD | ✅ Implémentation |
| Accès MySQL | - | ✅ Gérer | ✅ Utiliser |
| Hébergement | ✅ Décider | ✅ Opérer | ⚠️ Déployer |
| Types d'arrêts | ✅ Définir | - | ✅ Implémenter |
| Format exports | ✅ Valider | - | ✅ Développer |

**Légende:**  
- ✅ Responsable principal  
- ⚠️ Contributeur / Dépendant

---

## 🎯 Actions Recommandées

### Phase 1 : Pré-Kick-off (Avant développement)
1. **Workshop technique** (2h) avec Client UMAG + Lepresta + ITSEasy
   - Clarifier points critiques 1, 2, 3, 4
   - Valider schéma BD proposé
   - Définir format flux de données

2. **Document de spécifications techniques** (Lepresta → ITSEasy)
   - Format exact flux de données avec exemples réels
   - Credentials et accès BD
   - Architecture réseau et hébergement

3. **Maquettes export validées** (ITSEasy → Client UMAG)
   - Template PDF avec branding UMAG
   - Exemple fichier Excel avec formatage

### Phase 2 : Kick-off Projet (Semaine 1)
4. **Environnement de développement** opérationnel
   - Accès BD MySQL de test (Lepresta)
   - Flux de données de test/mock (Client UMAG)
   - Repository Git et CI/CD (ITSEasy)

5. **Points de synchronisation** hebdomadaires (tous les vendredis)
   - Démo des développements de la semaine
   - Validation incrémententale
   - Ajustements selon feedback

---

## 📞 Contacts

**ITSEasy** : [Contact développement]  
**Lepresta** : [Contact infrastructure]  
**Client UMAG** : [Contact projet / Responsable production]

---

**Document vivant** : Ce fichier sera mis à jour au fur et à mesure des clarifications.

**Dernière mise à jour :** 11 Octobre 2025

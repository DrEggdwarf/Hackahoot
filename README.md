# Hackahoot

Hackahoot est un outil automatisé pour répondre aux questions d'une partie Kahoot en utilisant l'intelligence artificielle (Anthropic/Claude). Il ouvre un navigateur automatisé, rejoint une partie Kahoot, lit chaque question, interroge Claude et clique automatiquement sur la bonne réponse.

> ⚠️ **Condition indispensable** : l'hôte doit activer l'option qui affiche les questions et les réponses sur les appareils des joueurs. Sans elle, Kahoot n'envoie au joueur que les formes colorées (ni texte de question, ni texte de réponse) et l'outil ne peut pas répondre.

---

## Prérequis

- **Windows 10/11** ou **Linux** (voir la note Linux plus bas)
- **Node.js** (version 18 ou supérieure)
- **npm** (installé avec Node.js)
- **Clé API Anthropic** (format `sk-ant-...`)
- **Accès à un compte Kahoot** (pour tester)

---

## 1. Ouvrir PowerShell en mode administrateur

1. Appuie sur `Win` puis tape `powershell`.
2. Clique droit sur **Windows PowerShell** puis choisis **Exécuter en tant qu'administrateur**.
3. Accepte l'UAC si demandé.

---

## 2. Vérifier que Node.js est installé

Dans PowerShell, tape :
```bash
node -v
```
- Si tu vois une version (ex : `v18.16.0`), c'est bon.
- Sinon, [télécharge Node.js ici](https://nodejs.org/) et installe-le, puis recommence la commande.

---

## 3. Télécharger et installer Hackahoot

1. **Clone le projet ou télécharge le ZIP**
   ```bash
   git clone https://github.com/Robin-BRG/Hackahoot.git
   cd <nom-du-dossier>
   ```
   ou décompresse le ZIP et `cd` dans le dossier.

2. **Installe les dépendances**
   ```bash
   npm install
   ```

---

## 4. Lancer l'application

Toujours dans PowerShell (dans le dossier du projet) :
```bash
npm start
```

- Une fenêtre Electron s'ouvre (interface graphique)
- Un navigateur automatisé s'ouvrira lors de la connexion à Kahoot

---

## 5. Utilisation de l'interface

1. **Remplis le formulaire de connexion** :
   - **Code PIN** : code de la partie Kahoot
   - **Pseudo** : nom d'utilisateur à afficher
   - **Clé API** : ta clé Anthropic (format `sk-ant-...`)
2. **Clique sur "Démarrer la partie"**

L'automatisation démarre :
- Le navigateur rejoint la partie Kahoot
- Le pseudo est renseigné
- À chaque question, la question et les réponses sont envoyées à Claude (Haiku 5.5), qui renvoie l'index de la bonne réponse au format JSON
- L'IA répond et clique automatiquement sur la bonne réponse
- L'interface affiche la question, les réponses, la réponse IA, le score, le timer, etc.

---

## 6. Pendant la partie

- **Ne ferme pas la fenêtre Electron ni le navigateur automatisé**
- Suis en temps réel :
  - La question courante
  - Les réponses possibles
  - La réponse choisie par l'IA
  - Le score et le timer
 
  Tu peux cliquer dans le navigateur pendant la partie.
  Le script ne gère pas encore les questions avec choix multiple, ni celle avec du drag n' drop... Uniquement choix unique ou question vrai/faux

---

## 7. Fin de partie

- Ferme la fenêtre Electron ou arrête le script dans PowerShell avec `Ctrl+C`.

---

## 8. Dépannage

- **Rien ne s'affiche** :
  - Vérifie que tu es bien dans le dossier du projet
  - Relance PowerShell en mode administrateur
  - Refais `npm install` puis `npm start`
- **Erreur Node.js** :
  - Vérifie la version avec `node -v`
  - Mets à jour Node.js si besoin
- **L'IA ne répond pas** :
  - Vérifie ta clé Anthropic
  - Vérifie que l'hôte a bien activé l'affichage des questions sur les appareils des joueurs
- **Linux : l'app ne démarre pas** :
  - Lance-la avec `npm start` (pas `electron .` directement) : le lanceur `scripts/start.js` retire `ELECTRON_RUN_AS_NODE` (hérité de VS Code) et force GTK 3 (Electron 36 plante si GTK 3 et GTK 4 sont chargés ensemble)
  - Vérifie ta connexion internet
- **Le navigateur automatisé ne clique pas** :
  - Attends quelques secondes, l'outil réessaie plusieurs fois
  - Vérifie que la page Kahoot n'a pas changé de structure
- **Pour voir les logs détaillés** :
  - Regarde la console PowerShell (logs détaillés de l'automatisation)
  - Ouvre les DevTools dans la fenêtre Electron (Ctrl+Shift+I)

---

## 9. Sécurité & Bonnes pratiques

- **Ne partage jamais ta clé Anthropic**
- Utilise cet outil uniquement sur des parties Kahoot où tu es autorisé à automatiser les réponses
- Respecte les conditions d'utilisation de Kahoot et d'Anthropic

---

## 10. Désinstallation

- Supprime le dossier du projet pour tout désinstaller

**Bon jeu avec Hackahoot !**

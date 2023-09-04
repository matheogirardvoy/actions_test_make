# GitHub action pour déployer un plugin sur Repository Voyelle

## Usage

Créer un fichier `.github/workflows/deploy.yml` à la racine de votre projet GitHub avec le contenu suivant :

```yaml
name: Deploy
on:
  release:
    types: [published]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: voyellefr/action_deploy@master
```

Ainsi, toutes les releases publiées déclencheront le déploiement du plugin sur le repository Voyelle.

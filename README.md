# GitHub action pour déployer un plugin sur Repository Voyelle

## Usage

Créer les secrets suivants dans le projet GitHub : 
- `API_REPO` : URL du Repository Voyelle
- `API_USER_EMAIL` : Email de l'utilisateur Repository
- `API_USER_PASSWORD` : Mot de passe de l'utilisateur Repository

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
      - uses: voyellefr/action_deploy@v1
        with:
          api_repo: ${{ secrets.API_REPO }}
          api_user_email: ${{ secrets.API_USER_EMAIL }}
          api_user_password: ${{ secrets.API_USER_PASSWORD }}
```

Ainsi, toutes les releases publiées déclencheront le déploiement du plugin sur le repository Voyelle.

### Mise à jour de l'action
https://github.com/actions/toolkit/blob/main/docs/action-versioning.md

# GitHub action pour déployer un plugin sur Repository Voyelle

## Usage

Créer les secrets suivants dans le projet GitHub :
- `PLUGIN_SLUG` : Slug du plugin à déployer
- `API_REPO` : URL du Repository Voyelle
- `API_REPO_LOGIN_URL` : URL de login du Repository Voyelle
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
      - name: Deploy
        uses: voyellefr/action_deploy@v1
        with:
          plugin_slug: ${{ secrets.PLUGIN_SLUG }}
          api_repo: ${{ secrets.API_REPO }}
          api_repo_login_url: ${{ secrets.API_REPO_LOGIN_URL }}
          api_user_email: ${{ secrets.API_USER_EMAIL }}
          api_user_password: ${{ secrets.API_USER_PASSWORD }}
```

Ainsi, toutes les releases publiées déclencheront le déploiement du plugin sur le repository Voyelle.

### Mise à jour de l'action
https://github.com/actions/toolkit/blob/main/docs/action-versioning.md

### Push le tag
```bash
git tag -fa <tag> -m "Tag message"
git push origin <tag> --force
```

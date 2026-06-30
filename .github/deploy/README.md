# O2Switch production deployment

The production workflow is `.github/workflows/deploy-on-production.yaml`.
It runs on pushes to `develop` and can also be started manually.

Customize non-sensitive settings in `o2switch-production.env`:

- `ALLOWED_ACTOR`: GitHub username allowed to deploy.
- `DEPLOY_BRANCH`: branch accepted by the deployment guard.
- `BUILD_COMMAND` and `BUILD_OUTPUT`: Nuxt static build command and generated folder.
- `REMOTE_PATH`: remote O2Switch path relative to the cPanel home directory.
- `BACKUP_PATH`: remote backup folder relative to the cPanel home directory.

Required GitHub Actions secrets:

- `CPANEL_USER`
- `CPANEL_HOST`
- `CPANEL_API_TOKEN`
- `SSH_KEY`

To prevent anyone else from pushing/deploying, also configure GitHub repository settings:

1. Create or update the `production` environment and restrict deployment approvals to `mattrbdr`.
2. Protect the `develop` branch with a ruleset or branch protection rule.
3. Restrict who can push to `develop` to `mattrbdr`.
4. Require pull requests and required status checks if collaborators should contribute without direct pushes.

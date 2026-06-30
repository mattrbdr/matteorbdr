# O2Switch production deployment

The production workflow is `.github/workflows/deploy-on-production.yaml`.
It runs on pushes to `develop` and can also be started manually.
The host-side deployment flow follows the O2Switch/cPanel workflow:

1. Build the Nuxt static site into a local deployment folder.
2. Remove all existing cPanel SSH whitelist entries.
3. Whitelist the GitHub runner IP on port `22`.
4. Verify that the runner IP is whitelisted.
5. Install the SSH key.
6. Back up the current remote production folder.
7. Deploy static files with `rsync --delete`.
8. Verify the remote `index.html` and clean old backups.
9. Roll back from the backup if deployment fails.
10. Remove the runner IP from the whitelist and clean local SSH keys.

Customize non-sensitive settings in `o2switch-production.env`:

- `ALLOWED_ACTOR`: GitHub username allowed to deploy.
- `DEPLOY_BRANCH`: branch accepted by the deployment guard.
- `BUILD_COMMAND` and `BUILD_OUTPUT`: Nuxt static build command and generated folder.
- `REMOTE_PATH`: remote O2Switch path relative to the cPanel home directory.
- `BACKUP_PATH`: remote backup folder relative to the cPanel home directory.
- `KEEP_BACKUPS`: number of remote backups to keep.

Required GitHub Actions secrets:

- `CPANEL_USER`
- `CPANEL_HOST`
- `CPANEL_API_TOKEN`
- `SSH_KEY`

Optional GitHub Actions secrets:

- `SSH_USER`: SSH login when it differs from `CPANEL_USER`.

`SSH_KEY` must be the private key whose public key is authorized for SSH access in O2Switch/cPanel.
It can be stored as a multiline secret or with literal `\n` line breaks; the workflow normalizes both formats.
Use an unencrypted deploy key for GitHub Actions, because the runner cannot type an interactive passphrase.
If the workflow fails with `Permission denied (publickey,...)` after `Offering public key`, the cPanel API token and IP whitelist are working, but `SSH_USER`, `CPANEL_HOST`, or `SSH_KEY` is not accepted by the SSH server.
The workflow prints the public key and fingerprint derived from `SSH_KEY`; authorize that public key in cPanel for the same user as `SSH_USER` or set `SSH_USER` to the correct SSH login.
The workflow intentionally calls cPanel `SshWhitelist/remove_all`, matching the working O2Switch example.

To prevent anyone else from pushing/deploying, also configure GitHub repository settings:

1. Create or update the `production` environment and restrict deployment approvals to `mattrbdr`.
2. Protect the `develop` branch with a ruleset or branch protection rule.
3. Restrict who can push to `develop` to `mattrbdr`.
4. Require pull requests and required status checks if collaborators should contribute without direct pushes.

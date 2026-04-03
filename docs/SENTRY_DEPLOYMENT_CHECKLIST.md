# Sentry Deployment Checklist

This project uses a safe two-part Sentry setup:

- `VITE_SENTRY_DSN` controls browser-side event capture at runtime.
- `SENTRY_AUTH_TOKEN` controls build-time sourcemap upload through the Vite plugin.

If `SENTRY_AUTH_TOKEN` is missing, the app still builds and deploys normally. The
only thing skipped is sourcemap upload.

## Environment setup

### Local development

- `VITE_SENTRY_DSN` is optional.
- Leave `SENTRY_AUTH_TOKEN` unset.
- Result: local app runs without build-pipeline risk.

### Preview or staging

- Set `VITE_SENTRY_DSN` if you want runtime event capture.
- Leave `SENTRY_AUTH_TOKEN` unset unless you explicitly want sourcemap uploads for preview builds.
- Result: previews stay stable even if Sentry credentials are missing.

### Production

- Set `VITE_SENTRY_DSN`.
- Set `SENTRY_AUTH_TOKEN`.
- Optional: set `SENTRY_DEBUG=true` temporarily when debugging upload behavior.
- Result: production captures runtime events and uploads sourcemaps.

## How the build is protected

Current Sentry behavior is intentionally guarded in:

- `/Users/seyederick/DevOps/_project_folders/SEF-PROJECT/seftec-store/src/main.tsx`
- `/Users/seyederick/DevOps/_project_folders/SEF-PROJECT/seftec-store/vite.config.ts`

Safety rules:

- Runtime Sentry only initializes when `VITE_SENTRY_DSN` exists.
- The Sentry Vite plugin only runs when `SENTRY_AUTH_TOKEN` exists and the mode is not development.
- Sourcemaps are only generated when the upload step is enabled.
- Upload errors are downgraded to warnings so Sentry does not hard-fail the deployment pipeline.

## Pre-deploy checks

Run these before a production deploy if you expect Sentry uploads to work:

```bash
sentry auth status
sentry project view lan-onasis/seftecub --json
bun run build
```

Expected outcome:

- `sentry auth status` succeeds.
- `sentry project view` returns the `seftecub` project.
- `bun run build` completes successfully.
- When `SENTRY_AUTH_TOKEN` is set, the build output shows source maps being uploaded.

## Troubleshooting

### Build passes but no source maps are uploaded

Check:

- `SENTRY_AUTH_TOKEN` is set in the actual build environment.
- The token has access to the `lan-onasis/seftecub` project.
- The build is not running in development mode.

### Runtime events are missing

Check:

- `VITE_SENTRY_DSN` is present in the deployed environment.
- The DSN belongs to `lan-onasis/seftecub`.
- The deployed app is loading the latest frontend bundle.

### Sentry starts breaking the pipeline again

The first things to verify are:

1. `vite.config.ts` still gates the plugin behind `SENTRY_AUTH_TOKEN`.
2. `build.sourcemap` is still conditional, not always-on.
3. `errorHandler` still warns instead of throwing.

If all three are true, Sentry should not be able to block a normal deploy.

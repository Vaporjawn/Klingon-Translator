# GitHub Actions Build Fix - Node.js Version Update

## Problem

The GitHub Actions workflows were failing with the following error:

```
You are using Node.js 18.20.8. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.
Error: Cannot find native binding. npm has a bug related to optional dependencies...
Error: Cannot find module '@rolldown/binding-linux-x64-gnu'
```

## Root Cause

- Vite (the build tool) requires Node.js version **20.19+ or 22.12+**
- GitHub Actions workflows were configured to use Node.js version **18**
- The native binding for Rolldown (used by Vite) is not compatible with Node.js 18

## Solution Applied

Updated the Node.js version from `18` to `20` in the following workflow files:

### 1. `.github/workflows/ci.yml`

- Updated `NODE_VERSION` environment variable from `"18"` to `"20"`
- This affects all CI/CD pipeline jobs:
  - Code quality checks and testing
  - Build and validation
  - E2E tests
  - Accessibility tests
  - Security audit
  - Deployment to GitHub Pages
  - Lighthouse performance monitoring

### 2. `.github/workflows/release.yml`

- Updated `NODE_VERSION` environment variable from `"18"` to `"20"`
- This affects all release workflow jobs:
  - Creating GitHub releases
  - Building release assets
  - Publishing to NPM
  - Community notifications

### 3. `.github/workflows/surge-deploy.yml`

- Already using Node.js version `"20"` ✅
- No changes needed

## Verification

- All workflow files now use Node.js 20 for builds
- Node.js 20 meets Vite's minimum requirement of 20.19+
- The `@rolldown/binding-linux-x64-gnu` native binding should now be compatible

## Testing

Once these changes are pushed to the repository, the following should occur:

1. GitHub Actions will use Node.js 20 for all build jobs
2. Vite build should complete successfully
3. All CI/CD pipeline checks should pass
4. Deployment workflows should execute without errors

## Files Modified

- `.github/workflows/ci.yml` - Changed NODE_VERSION from "18" to "20"
- `.github/workflows/release.yml` - Changed NODE_VERSION from "18" to "20"

## Date Fixed

October 6, 2025

## Additional Notes

- The Dependabot auto-approve workflows don't require Node.js version updates as they don't build the project
- All other workflows will continue to function as expected
- Future Vite updates may require Node.js version adjustments

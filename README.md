# Setup custom CLI tooling in a custom action

This GitHub Action installs `golangci-lint`, a popular Go linter aggregator, and adds it to the workflow's `PATH` for use in subsequent steps. It provides flexible version management and streamlined setup for Go linting workflows.

## Description

The `my-cli-action` action simplifies the installation and configuration of `golangci-lint` in your GitHub Actions workflows. It:

- Downloads and installs `golangci-lint` from the official install script
- Supports specific version pinning or automatic latest version installation
- Adds the installed binary to the workflow PATH for immediate use in subsequent steps
- Accepts both `v`-prefixed and non-prefixed version strings for maximum flexibility
- Streams installation output directly to runner logs for visibility and debugging

## Inputs

### `version`

**Description:** The version of `golangci-lint` to install  
**Required:** `true`  
**Type:** `string`  
**Default:** None

The version string can be specified with or without a `v` prefix (e.g., `1.52.2` or `v1.52.2` are both valid). If you want to install the latest version, pass an empty string or omit the input.

> **Note:** Although marked as required in `action.yml`, the implementation allows an empty string to install the latest version.

## Outputs

This action does not produce any outputs. It modifies the workflow environment by adding `golangci-lint` to the PATH.

## Environment Variables

The action uses the following environment variables automatically provided by GitHub Actions:

- `GITHUB_WORKSPACE` — The default working directory on the runner where the repository is checked out. The action installs `golangci-lint` to `$GITHUB_WORKSPACE/bin`.

## Secrets

This action does not require any secrets.

## Example Usage

### Install the Latest Version

```yaml
name: Lint with golangci-lint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install golangci-lint
        uses: travboz/ms-learn-custom-actions/.github/actions/my-cli-action@main
        with:
          version: "2.1.2"
      
      - name: Run linter
        run: golangci-lint run ./...
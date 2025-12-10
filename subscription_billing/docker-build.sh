#!/bin/bash
# Anchor Build Script using Docker
# This script builds the Solana Anchor project using Docker to avoid local toolchain issues

set -e

echo "🚀 Building Solana Anchor project with Docker..."

# Navigate to project directory
cd "$(dirname "$0")"

# Build using Anchor's official Docker image
docker run --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  backpackapp/build:v0.30.1 \
  bash -c "export CARGO_BUILD_JOBS=1 && anchor build --skip-lint --no-idl > build.log 2>&1 && chown -R $(id -u):$(id -g) target build.log"

echo "✅ Build complete! Artifacts are in target/deploy/"

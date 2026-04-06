#!/bin/bash
set -e

echo "=== Running formatter ==="
if bun run format; then
  echo "✅ Format passed"
else
  echo "❌ Format failed"
  exit 1
fi

echo "=== Running linter ==="
if bun run lint -- --max-warnings=0; then
  echo "✅ Lint passed"
else
  echo "❌ Lint failed"
  exit 1
fi

echo "=== Running tests ==="
if bun run test; then
  echo "✅ Tests passed"
else
  echo "❌ Tests failed"
  exit 1
fi

echo "=== Building project ==="
if bun run build; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

echo "🎯 All steps completed successfully"

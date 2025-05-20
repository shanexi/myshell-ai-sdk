#!/bin/bash
cd "$(dirname "$0")/.."
../../../node_modules/@tailwindcss/cli/dist/index.mjs -i ./src/styles.css -o output.css

# Create a copy with v4 prefixes
cp output.css output-prefixed.css

# Replace the layer order declaration at the top
sed -i '' 's/@layer theme, base, components, utilities;/@layer theme, v4-base, v4-components, v4-utilities;/' output-prefixed.css

# Replace individual layer declarations
sed -i '' 's/@layer base/@layer v4-base/g' output-prefixed.css
sed -i '' 's/@layer components/@layer v4-components/g' output-prefixed.css
sed -i '' 's/@layer utilities/@layer v4-utilities/g' output-prefixed.css

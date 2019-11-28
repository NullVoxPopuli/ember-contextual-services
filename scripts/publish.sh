#!/bin/bash

set -e

# This is temporary until I figure out a better name to publish
# the package under, or I get rights to the package on npm

cat package.json | jq '.name = "ember-contextual-services--alpha"' | jq . > package.tmp.json

# yarn _prepublishOnly

mv package.json package.backup.json
mv package.tmp.json package.json

# yarn publish

mv package.backup.json package.json

yarn _postpublish




#!/bin/bash

cat package.json | jq '.name = "ember-contextual-services--alpha"' > package.json

# cat package.json | jq '.name = ember-contextual-services'

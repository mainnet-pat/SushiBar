#!/bin/bash
set -x

branch_name="$1"

if [ -z "$branch_name" ]; then
  echo "Error: branch name is required."
  exit 1
fi

if [ "$#" -gt 1 ]; then
  echo "Error: only one branch name argument is allowed."
  exit 1
fi

rm -rf dist
yarn install && yarn build
git checkout -B $branch_name
rm -rf src test tasks jest* tsconfig*
git add -f dist
git add .
git commit -m "Release $branch_name"
git push origin $branch_name --force
git tag "$branch_name"
git push origin tag "$branch_name"
git checkout master

echo "Release branch $branch_name created and pushed successfully."
echo "yarn add olando@https://github.com/mainnet-pat/olando.git#$branch_name"
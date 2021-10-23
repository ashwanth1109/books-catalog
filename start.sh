#!/usr/bin/env bash

echo "Running start script. . ."

if [ "$1" == "run" ]
then
  skaffold dev
elif [ "$1" == "lint" ]; then
    cd books-msvc || exit
    npm run lint
fi

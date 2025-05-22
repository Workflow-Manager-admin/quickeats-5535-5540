#!/bin/bash
cd /home/kavia/workspace/code-generation/quickeats-5535-5540/main_container_for_quickeats
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


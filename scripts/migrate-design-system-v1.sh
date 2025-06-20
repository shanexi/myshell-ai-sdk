#!/bin/bash

node scripts/update-tailwind-vars.js --suffix -v1 libs/biz/ui libs/message-plugins libs/archive/chat libs/ui-primitives apps --css-file libs/tailwind-cfg/design-system-v1.css

#!/bin/bash
target="src/core/commands.ts"

echo "Preparing KanonBot..."

## Remove and generate file
rm -rf "$target"
touch "$target"

## Starting work..
cat >> "$target" <<EOT
// DO NOT MODIFY IT MANUALLY.
// commands.ts file is generated for each run.

import TelegramBot = require('node-telegram-bot-api')
EOT

## Import invidual commands
for file in src/command/*.ts; do

filename=$(basename  "$file" | cut -d. -f1)
pascalcase=$(basename  "$file" | cut -d. -f1 | sed 's/\b./\u&/g')

cat >> "$target" <<EOT 
import { $pascalcase } from '../command/$filename';
EOT

done

cat >> "$target" <<EOT 

export function onText(bot: TelegramBot) {
EOT

## Execute invidiual commands
for file in src/command/*.ts; do
pascalcase=$(basename  "$file" | cut -d. -f1 | sed 's/\b./\u&/g')
cat >> "$target" <<EOT 
    new $pascalcase().textMatch(bot);
EOT
done

## Finishing work...
cat >> "$target" <<EOT 
}
EOT

echo "KanonBot is Ready!"

ts-node src/index.ts
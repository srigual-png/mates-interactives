#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const files = process.argv.slice(2);
if (!files.length) files.push('2eso/sentit-numeric.html');

let failed = false;
for (const input of files) {
  const file = path.resolve(input);
  let html;
  try {
    html = fs.readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`Cannot read HTML file "${input}": ${error.message}`);
    failed = true;
    continue;
  }

  const tags = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let match;
  let block = 0;
  let checked = 0;
  while ((match = tags.exec(html)) !== null) {
    const attrs = match[1];
    if (/(^|\s)src\s*=/i.test(attrs)) continue;

    block += 1;
    checked += 1;
    const line = html.slice(0, match.index).split(/\r\n|\r|\n/).length;
    const id = (attrs.match(/(?:^|\s)id\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i) || []).slice(1).find(Boolean);
    const label = `${input}: inline script #${block}${id ? ` (id="${id}")` : ''}, starts at line ${line}`;
    try {
      new vm.Script(match[2], { filename: label });
    } catch (error) {
      console.error(`JavaScript syntax error in ${label}: ${error.message}`);
      failed = true;
    }
  }
  if (!checked) {
    console.error(`No inline <script> blocks found in "${input}".`);
    failed = true;
  } else if (!failed) {
    console.log(`${input}: ${checked} inline script block(s) passed Node syntax check.`);
  }
}

if (failed) process.exitCode = 1;

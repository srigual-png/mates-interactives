#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'../.github/workflows');
const legacy=fs.readdirSync(root).filter(x=>x.startsWith('test-mesura-2eso-')&&x.endsWith('.yml'));
assert(legacy.length>=92,'Workflow legacy missing from branch');
for(const filename of legacy){const y=fs.readFileSync(path.join(root,filename),'utf8');assert(/^\s*workflow_dispatch:\s*$/m.test(y),'No manual trigger: '+filename);assert(!/^\s*pull_request:\s*$/m.test(y),'Legacy PR trigger remains: '+filename);assert(!/^\s*push:\s*$/m.test(y),'Legacy push trigger remains: '+filename);assert(/^\s*jobs:\s*$/m.test(y),'Jobs missing: '+filename);}
const integration=fs.readFileSync(path.join(root,'mesura-2eso-integracio.yml'),'utf8');
assert(/^\s*pull_request:\s*$/m.test(integration),'Central integration must be the sole PR trigger');
assert(/^\s*workflow_dispatch:\s*$/m.test(integration),'Central integration should also be manual');
console.log(JSON.stringify({legacy_workflows_manual_only:legacy.length,central_integration:'mesura-2eso-integracio.yml',status:'ok'},null,2));

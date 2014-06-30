#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var gitRoot;
try {
  gitRoot = execSync('git rev-parse --show-toplevel').toString().trim();
} catch(e) {
  console.error("Not a git repository, nothing to remove");
}

// compare existing and out precommit
var gitHookPreCommitPath = path.join(gitRoot, '.git', 'hooks', 'pre-commit');
var stat1 = fs.statSync(gitHookPreCommitPath);
var stat2 = fs.statSync(path.join(__dirname, 'pre-commit'));

if (stat1.size != stat2.size) {
  console.error("Found pre-commit, but size is different, cowardly refusing to remove.");
  process.exit();
}

console.log('Removing .git/hooks/pre-commit...');
fs.unlinkSync(gitHookPreCommitPath);

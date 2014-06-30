#!/usr/bin/env node

// copy pre-commit to .git/hooks/pre-commit

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;

var gitRoot;
try {
  gitRoot = execSync('git rev-parse --show-toplevel').toString().trim();
} catch(e) {
  console.error("Not a git repository");
  process.exit(1);
}

var sourcePath, destPath;

sourcePath = path.join(__dirname, 'pre-commit');
destPath = path.join(gitRoot, '.git', 'hooks', 'pre-commit');

if (fs.existsSync(destPath)) {
  console.error("Error: file already exists: " + destPath);
  console.error("Cowardly refusing to overwrite.");
  console.error("Please review " + destPath + " and merge it with " + sourcePath + " manually ");
  process.exit();
}

console.log('Creating .git/hooks/pre-commit...');
fs.writeFileSync(destPath, fs.readFileSync(sourcePath));
fs.chmodSync(destPath, '755');


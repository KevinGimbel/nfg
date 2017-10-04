#!/usr/bin/env node

const { nfg } = require('./lib/nfg.js');
let args = process.argv;
let source = args.pop()
let npm_flags = args.slice(2);

function Usage() {
  console.log(
`
  USAGE: nfg [options] user/repo

  Download node modules from GitHub, both from private and public repositories.

  Options can be any option passed to npm, for example "-g".

  Example:
  $ nfg -g kevingimbel/leetscript-cli
  $ nfg lynzt/fs_readfile
`);
  process.exit(0);
}
// Usage, help, or no CLI arguments passed
if ( source == "usage" || source == "help" || process.argv.length == 1) {
  Usage();
}

nfg.log(`Installing from ${source}\n`);

let to = nfg.progress();

nfg.InstallFromGit(npm_flags, source).then((result) => {
  console.log(result);
  clearInterval(to);
  process.exit(0);
}).catch(err => {
  console.log(err);
  clearInterval(to);
  process.exit(1);
});

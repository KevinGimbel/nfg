'use strict';
const { exec } = require('child_process');
let nfg_git_source = process.env.nfg_GIT_SOURCE || 'git@github.com:';

class nfg {

  log(msg) {
    console.log("[nfg]:", msg)
  }

  progress() {
    let symbols = ["∴", "∵"];
    let prog = symbols[0];
    let i = 0;
    return setInterval(_ => {
      i++;
      let index = i % 2 == 0 ? 0 : 1;
      prog = symbols[index];
      process.stdout.write(`[${prog}]\r`);
    }, 500);
  }

  InstallFromGit(flags, repo) {
    return new Promise( (resolve, reject) => {

      if(!this.IsRepo(repo)) {
        reject(`"${repo}" does not appear to be a git repository. See "nfg help" or "nfg usage" for more.`);
      }

      exec(`npm install ${flags} ssh+git://${nfg_git_source}${repo}`, (error, stdout, stderr) => {
        if (error) {
          reject(`nfg error: ${error}`);
          return;
        }

        resolve(`${stdout}`);

        if(stderr) {
          reject(`${stderr}`);
        }
      });
    });
  }

  IsRepo(str) {
    return str.split("/").length == 2;
  }
}

module.exports.nfg = new nfg();

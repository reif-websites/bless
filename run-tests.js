#!/usr/bin/env babel-node
/* eslint no-process-exit: 0 */

import chalk from 'chalk';
import pkg from 'child-process-promise';
const { exec, spawn } = pkg;

const isCI = process.env.CONTINUOUS_INTEGRATION === 'true';

function myspawn(command) {
  console.log(`> ${command}\n`);
  let [cmd, ...args] = command.split(' ');

  return spawn(cmd, args, {stdio: 'inherit'})
    .then(() => console.log(''));
}

myspawn('npm run lint')
  .then(() => {
    console.log(chalk.cyan('Gathering Code Coverage...\n'));
    return exec('rm -rf ./.coverage');
  })
  .then(() => {
    if (isCI) {
      return exec('cat ./.coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js');
    }
  })
  .catch(err => {
    if (err.stack) {
        console.error(err.stack);
    } else {
        console.error(err);
    }
    process.exit(1);
  });

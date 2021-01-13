import chalk from 'chalk';
import yargs from 'yargs';
import { version } from '../../package.json';

export default function appendCommon() {
  yargs.usage(chalk.magenta(`Updated BlessCSS v${version}`) + ' - Tools to ensure CSS files meet IE 6-9 selector limit restrictions.')
    .wrap(null);
}

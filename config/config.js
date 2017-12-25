const fs = require('fs');
const colors = require('colors');

let config;
let configFilePath = `${__dirname}/config.json`;

config = readConfig();

function readConfig() {
    try {
        let fileContents = fs.readFileSync(configFilePath);
        let result = JSON.parse(fileContents);
        return result;
    } catch (ex) {
        console.log(`${colors.bold.red('ERROR: ')}Something went wrong will reading/parsing config file\n${colors.bgRed.white(configFilePath)}`);
        console.log(colors.bold.red(`${ex}\n`));
        process.exit();
    }
}

module.exports = config;
const chalk = require('chalk');

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const now = new Date().toISOString();

    console.log(
        chalk.gray('[Logger]'),
        chalk.green(method),
        chalk.yellow(url),
        chalk.blue(now)
    );

    next();
};

module.exports = logger;
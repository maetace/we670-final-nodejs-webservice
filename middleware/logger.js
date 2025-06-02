const chalk = require('chalk');

const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(
        chalk.gray('[Logger]'),
        chalk.green(req.method),
        chalk.yellow(req.url),
        chalk.blue(now)
    );
    next();
};

module.exports = logger;
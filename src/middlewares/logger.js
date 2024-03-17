const morgan = require("morgan");

const logger = ({ debug }) => {
    if (debug) {
        return morgan("dev");
    }

    return morgan("common");
};

module.exports = logger;

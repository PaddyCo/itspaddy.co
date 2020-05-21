const moment = require("moment");

module.exports = {
  dateFormat: (d) => moment(d, "YYYY-MM-DD").format("MMMM Do, YYYY"),
};

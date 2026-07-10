const { DateTime } = require("luxon");
const events = require("./events.json");

module.exports = function () {
  const now = DateTime.now().setZone("America/Denver").startOf("day").toMillis();
  return events
    .filter(e => {
      const checkDate = e.endDate || e.date;
      return DateTime.fromISO(checkDate, { zone: "America/Denver" }).toMillis() < now;
    })
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
};

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj, { zone: "America/Denver" }).toFormat(format);
    }
    return DateTime.fromJSDate(dateObj, { zone: "America/Denver" }).toFormat(format);
  });

  // Formats a date range: same month → "Sept 11–13, 2026"; cross-month → "Aug 29 – Sept 1, 2026"
  eleventyConfig.addFilter("dateRange", (startDate, endDate) => {
    if (!startDate) return "";
    const start = DateTime.fromISO(startDate, { zone: "America/Denver" });
    if (!endDate) return start.toFormat("MMMM d, yyyy");
    const end = DateTime.fromISO(endDate, { zone: "America/Denver" });
    if (start.month === end.month && start.year === end.year) {
      return `${start.toFormat("MMMM d")}–${end.toFormat("d, yyyy")}`;
    }
    if (start.year === end.year) {
      return `${start.toFormat("MMMM d")} – ${end.toFormat("MMMM d, yyyy")}`;
    }
    return `${start.toFormat("MMMM d, yyyy")} – ${end.toFormat("MMMM d, yyyy")}`;
  });

  // "now" snaps to start-of-day in Mountain Time so today's events stay upcoming all day
  eleventyConfig.addFilter("toMillis", (dateObj) => {
    if (!dateObj) return 0;
    if (dateObj === "now") return DateTime.now().setZone("America/Denver").startOf("day").toMillis();
    if (typeof dateObj === "string") return DateTime.fromISO(dateObj, { zone: "America/Denver" }).toMillis();
    if (dateObj instanceof Date) return DateTime.fromJSDate(dateObj, { zone: "America/Denver" }).toMillis();
    return 0;
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};

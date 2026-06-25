const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj, { zone: "America/Denver" }).toFormat(format);
    }
    return DateTime.fromJSDate(dateObj, { zone: "America/Denver" }).toFormat(format);
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

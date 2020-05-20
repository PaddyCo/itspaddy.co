const moment = require("moment");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./assets/css");
  eleventyConfig.addWatchTarget("./assets/js");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/images");

  eleventyConfig.addFilter("dateFormat", dateFormat)
  eleventyConfig.addFilter("getNextPrevFromCollection", getNextPrevFromCollection)

  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getAllSorted("post").map(
      (p) => {
        p.data.thumbnail = `https://picsum.photos/1000/300?random=${parseInt(Math.random() * 100)}`;
        return p;
      });
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
};


function dateFormat(dateString) {
  return moment(dateString, "YYYY-MM-DD").format('MMMM Do, YYYY');
}

function getNextPrevFromCollection(collection, page) {
  const index = collection.findIndex((i) => i.url == page.url);
  let pages = []

  if (index > 0) {
    pages.push({ type: "previous", page: collection[index-1] })
  }

  if (index < collection.length-1) {
    pages.push({ type: "next", page: collection[index+1] })
  }

  return pages;
}

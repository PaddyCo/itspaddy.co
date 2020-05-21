const moment = require("moment");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { dateFormat } = require("./helpers");

module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addWatchTarget("./assets/css");
  eleventyConfig.addWatchTarget("./assets/js");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/images");

  eleventyConfig.addFilter("dateFormat", dateFormat)
  eleventyConfig.addFilter("getIndexInCollection", getIndexInCollection)
  eleventyConfig.addFilter("getNextInCollection", getNextInCollection)
  eleventyConfig.addFilter("getPrevInCollection", getPrevInCollection)
  eleventyConfig.addFilter("getPaginationButtons", getPaginationButtons)

  eleventyConfig.addCollection("post", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
};

function getIndexInCollection(collection, page) {
  return collection.findIndex((i) => i.url == page.url);
}

function getNextInCollection(collection, page) {
  const index = getIndexInCollection(collection, page);
  return index < collection.length-1 ? collection[index+1] : null;
}

function getPrevInCollection(collection, page) {
  const index = getIndexInCollection(collection, page);
  return index > 0 ? collection[index-1] : null;
}

function getPaginationButtons(pagination) {
  const page = pagination.pageNumber+1
  const pageCount = pagination.pages.length;
  let start = page - 2;
  let end = page + 2;

  if (end > pageCount) {
    start -= (end - pageCount);
    end = pageCount;
  }
  if (start <= 0) {
    end += ((start - 1) * -1);
    start = 1;
  }

  end = end > pageCount ? pageCount : end;

  let range = [];
  for (var i = start; i <= end; i++) {
    range.push(
      {
        index: i,
        url: pagination.hrefs[i-1],
        current: page == i,
      }
    );
  }
  return range;
}

const moment = require("moment");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addWatchTarget("./assets/css");
  eleventyConfig.addWatchTarget("./assets/js");
  eleventyConfig.addPassthroughCopy("assets/fonts");
  eleventyConfig.addPassthroughCopy("assets/images");

  eleventyConfig.addFilter("dateFormat", dateFormat)
  eleventyConfig.addFilter("getNextPrevFromCollection", getNextPrevFromCollection)
  eleventyConfig.addFilter("getPaginationButtons", getPaginationButtons)

  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getAllSorted()
      .filter((p) => p.data.tags ? p.data.tags.indexOf("post") >= 0 : false)
      .map(hydratePost);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  }
};


function hydratePost(post) {
  post.data.thumbnail = `https://picsum.photos/1000/300?random=${parseInt(Math.random() * 100)}`;
  return post;
}


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

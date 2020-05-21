const moment = require("moment");
const slugify = require("slugify");

module.exports = {
  layout: "post.njk",
  eleventyComputed: {
    thumbnail: data => `https://picsum.photos/1000/300?random=${data.title.replace(" ", "-")}`,
    permalink: data => {
      if (data.permalink) {
        return data.permalink;
      }

      return `/blog/${moment(data.page.date).format("YYYY/MM/DD")}/${slugify(data.title, { lower: true })}/index.html`;
    }
  },
};

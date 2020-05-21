---
title: Hello blog
---

Hello, this is just a little test post until I get some actual content on this
blog. I'm gonna make use of this post to test some features: Typography, syntax
highlighting, images etc.

## Typography

This is a regular paragraph with some **bolded** and _italic_ text

Nam in cursus velit, at luctus nulla. Etiam vestibulum suscipit elit in
tincidunt. 
Aliquam tempor pharetra enim, auctor maximus tortor luctus tempor. Class aptent
taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
Fusce vestibulum ligula sem, ac dignissim diam facilisis eu. Vestibulum ut luctus ipsum. Nulla vehicula aliquam libero eu ultricies. 

### H3
#### H4
##### H5

## Lists

* Test
* List
  * Sub item
* Here

## Images

TODO

## Code

Here is some examples of syntax highlighting:

```js
const THIS_IS_A_CONSTANT = 5.0;

function foo(bar) {
  return bar * 20;
}

module.exports = {
  layout: "post.njk",
  test: true, // This is a comment
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
```

```css
body {
  background-color: blue;
  color: #000 !important;
}
```


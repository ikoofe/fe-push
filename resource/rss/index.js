const moment = require("moment");
const Parser = require("rss-parser");
const feeds = require("./feeds");

function requestBlogs(urls) {
  const parser = new Parser({
    timeout: 20000,
  });
  const yestoday = moment({ hour: 0, minute: 0, seconds: 0 }).add(-1, "days");
  const today = moment({ hour: 0, minute: 0, seconds: 0 });
  return urls.map((url) => {
    return new Promise((resolve, reject) => {
      try {
        parser
          .parseURL(url)
          .then((feed) => {
            const blogs = feed.items
              .map((item) => ({
                title: item.title,
                link: item.link,
                content: item.content || item["content:encoded"],
                pubDate: new Date(item.pubDate),
              }))
              .filter(
                (item) => yestoday < item.pubDate && today > item.pubDate
              );

            resolve(blogs);
          })
          .catch((error) => {
            console.error(url, error);
            resolve([]);
          });
      } catch (error) {
        console.log(error);
        reject([]);
      }
    });
  });
}

module.exports = (categroy = 'en') => {
  return Promise.all(requestBlogs(feeds[categroy])).then((blogs) => {
    return blogs
      .reduce((current, all) => [...current, ...all], [])
      .filter((blog, index, array) => {
        return array.findIndex((item) => item.title === blog.title) === index;
      });
  });
};

const moment = require("moment");
const Parser = require("rss-parser");
const feeds = require("./feeds");

function requestBlogs(urls) {
  const parser = new Parser({
    timeout: 50000,
  });
  const yestoday = +moment({ hour: 0, minute: 0, seconds: 0 }).add(-1, "days");
  const today = +moment({ hour: 0, minute: 0, seconds: 0 });
  return urls.map((url) => {
    return new Promise((resolve) => {
      try {
        parser
          .parseURL(url)
          .then((feed) => {
            const author = (feed.title || '').replace(/\n/g, '').trim().split(':')[0]
            const blogs = feed.items
              .map((item) => ({
                title: `${item.title.trim()} - ${author}`,
                link: item.link,
                content: item.content || item["content:encoded"],
                pubDate: +new Date(item.pubDate),
              }))
              .filter(
                (item) => yestoday < item.pubDate && today >= item.pubDate
              );
            resolve(blogs);
          })
          .catch((error) => {
            console.error(url, error);
            resolve([]);
          });
      } catch (error) {
        console.error(error);
        resolve([]);
      }
    });
  });
}

module.exports = (categroy) => {
  if (!categroy) {
    categroy = Object.keys(feeds);
  }
  if (typeof categroy === 'string') {
    categroy = [categroy];
  }

  const targetFeeds = categroy.reduce((previous, current) => {
    return [...previous, ...feeds[current]];
  }, []);
  
  return Promise.all(requestBlogs(targetFeeds)).then((blogs) => {
    return blogs
      .reduce((current, all) => [...current, ...all], [])
      .filter((blog, index, array) => {
        return array.findIndex((item) => item.title === blog.title) === index;
      });
  });
};

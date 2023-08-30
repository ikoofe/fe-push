const moment = require('moment');
const Parser = require('rss-parser');
const feeds = require('./feeds');

function requestRss(urls) {
  const parser = new Parser({
    timeout: 5000,
  });
  const startTime = +moment({ hour: 0, minute: 0, seconds: 0 }).add(-1, 'days');
  const endTime = +moment({ hour: 0, minute: 0, seconds: 0 });
  return urls.map((url) => {
    return new Promise((resolve) => {
      try {
        parser
          .parseURL(url)
          .then((feed) => {
            const author = (feed.title || '').replace(/\n/g, '').trim().split(':')[0];
            const blogs = feed.items
              .map((item) => ({
                title: `${item.title.trim()} - ${author}`,
                link: item.link,
                content: item.content || item['content:encoded'],
                pubDate: +new Date(item.pubDate),
              }))
              .filter((item) => {
                console.log(url, item)
                return startTime < item.pubDate && endTime >= item.pubDate;
              });

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

module.exports = (_feeds) => {
  const targetFeeds = _feeds || feeds;
  return Promise.allSettled(requestRss(targetFeeds)).then((result) => {
    return result
      .filter((item) => item.status === 'fulfilled')
      .reduce((previous, current) => [...previous, ...current.value], []);
  });
};

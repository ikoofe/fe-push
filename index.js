const CronJob = require("cron").CronJob;
const request = require("superagent");
const config = require("config");

const wechat = require('./wechat')
const dingding = require('./dingding');

const getJuejinPost = require("./resource/juejin");
const getRSSPost = require("./resource/rss");

// 0 0 17 * * *
// new CronJob(
//   "0 0 17 * * *",
//   function () {
//     getRSSPost().then((items) => {
//       const blogs = items.map((blog) => `- [${blog.title}](${blog.link})`);
//       dingNotice(blogs, "国外文章汇总");
//     });
//   },
//   null,
//   true,
//   "Asia/Shanghai"
// ).start();

new CronJob(
  "0 30 8 * * *",
  function () {
    getJuejinPost().then((items) => {
      // dingding.send({ 
      //   text: items.map((blog) => `- [${blog.title}](${blog.link})`);,
      //   title: '早读文章汇总',
      //   dingToken: config.dingToken,
      // })

      
      wechat.send({
        topic: config.wxTopic,
        title: '掘金文章',
        text: items.map((blog) => `「${blog.title}」${blog.link}`).join('\n')
      });
    });
  },
  null,
  true,
  "Asia/Shanghai"
).start();

console.log("服务已经启动!");

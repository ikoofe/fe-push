const CronJob = require("cron").CronJob;
const request = require("superagent");
const config = require("config");

const getJuejinPost = require("./resource/juejin");
const getRSSPost = require("./resource/rss");

function dingNotice(blogs, title) {
  if (blogs.length === 0) {
    return;
  }
  request
    .post(
      `https://oapi.dingtalk.com/robot/send?access_token=${config.dingToken}`
    )
    .send({
      msgtype: "markdown",
      markdown: {
        title: title,
        text: `## ${title} ##\n` + blogs.join("\n"),
      },
    })
    .then((res) => {
      console.log("yay got " + JSON.stringify(res.body));
    });
}

// 0 0 17 * * *
new CronJob(
  "0 0 17 * * *",
  function () {
    getRSSPost().then((items) => {
      const blogs = items.map((blog) => `- [${blog.title}](${blog.link})`);
      dingNotice(blogs, "国外文章汇总");
    });
  },
  null,
  true,
  "Asia/Shanghai"
).start();

new CronJob(
  "0 5 10 * * *",
  function () {
    getJuejinPost().then((items) => {
      const blogs = items.map((blog) => `- [${blog.title}](${blog.link})`);
      dingNotice(blogs, "早读文章汇总");
    });
  },
  null,
  true,
  "Asia/Shanghai"
).start();

console.log("服务已经启动!");

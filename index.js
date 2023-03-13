const CronJob = require("cron").CronJob;
const config = require("config");

// const wechat = require('./wechat');
// const dingding = require('./dingding');
const wecom = require('./wecom');

const getJuejinPost = require("./resource/juejin");
const getRSSPost = require("./resource/rss");

new CronJob(
  "0 00 10 * * *",
  async function () {
    const juejinList = await getJuejinPost().catch(() => []);
    const cnRSSList = await getRSSPost('cn').catch(() => []);
    const enRSSList = await getRSSPost('en').catch(() => []);

    const blogs = [...cnRSSList, ...enRSSList, ...juejinList];
  
    wecom.send({
      blogs: blogs.map((blog) => `- [${blog.title}](${blog.link})`),
      title: '每日汇总',
      token: config.wecomKey,
    })

    // dingding.send({ 
    //   text: items.map((blog) => `- [${blog.title}](${blog.link})`);,
    //   title: '早读文章汇总',
    //   dingToken: config.dingToken,
    // })

    // wechat.send({
    //   topic: config.wxTopic,
    //   title: '掘金文章',
    //   text: items.map((blog) => `「${blog.title}」${blog.link}`).join('\n')
    // });
  },
  null,
  true,
  "Asia/Shanghai"
).start();

console.log("服务已经启动!");

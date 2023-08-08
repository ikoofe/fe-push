const config = require('config');
const CronJob = require('cron').CronJob;

const subscribe = require('./subscribe');
const publish = require('./publish');

new CronJob(
  config.cronTime || '0 00 10 * * *',
  async function () {
    const blogs = await subscribe();
    const error = await publish({ blogs });
    if (error) {
      console.log(error);
    }
  },
  null,
  true,
  'Asia/Shanghai'
).start();

console.log('服务已经启动!');

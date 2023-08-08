const config = require('config');

module.exports = async ({ blogs }) => {
  const { dingToken, wecomToken, wechatToken, larkToken, title = '每日汇总' } = config;
  try {
    if (wecomToken) {
      const wecom = require('./wecom');

      await wecom.send({
        blogs,
        title,
        token: wecomToken,
      });
    }
  
    if (dingToken) {
      const dingding = require('./dingding');

      await dingding.send({
        blogs,
        title,
        token: dingToken,
      });
    }
  
    if (wechatToken) {
      const wechat = require('./wechat');

      await wechat.send({
        blogs,
        title,
        token: wechatToken,
      });
    }

    if (larkToken) {
      const lark = require('./lark');

      await lark.send({
        blogs,
        title,
        token: larkToken,
      });
    }
  } catch (error) {
    return error;
  }
};
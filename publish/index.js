const config = require('config');
const dingding = require('./dingding');
const wechat = require('./wechat');
const wecom = require('./wecom');
const lark = require('./lark');

const { dingToken, wecomToken, wechatToken, larkToken, title = '每日汇总' } = config;

module.exports = async ({ blogs }) => {
  try {
    if (wecomToken) {
      await wecom.send({
        blogs,
        title,
        token: wecomToken,
      });
    }
  
    if (dingToken) {
      await dingding.send({
        blogs,
        title,
        token: dingToken,
      });
    }
  
    if (wechatToken) {
      await wechat.send({
        blogs,
        title,
        token: wechatToken,
      });
    }

    if (larkToken) {
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
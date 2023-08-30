const config = require('config');
const dingding = require('./dingding');
const wechat = require('./wechat');
const wecom = require('./wecom');
const lark = require('./lark');

const { dingToken, wecomToken, wechatToken, larkToken, title = '每日汇总' } = config;

if (wechatToken) {
  wechat.start();
}

module.exports = async (blogs) => {
  try {
    if (wecomToken) {
      wecom.send({
        blogs,
        title,
        token: wecomToken,
      });
    }
  
    if (dingToken) {
      dingding.send({
        blogs,
        title,
        token: dingToken,
      });
    }
  
    if (wechatToken) {
      wechat.send({
        blogs,
        title,
        token: wechatToken,
      });
    }

    if (larkToken) {
      lark.send({
        blogs,
        title,
        token: larkToken,
      });
    }
  } catch (error) {
    return error;
  }
};
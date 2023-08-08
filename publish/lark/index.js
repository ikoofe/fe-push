const request = require('superagent');

async function send({ blogs, title, token }) {
  if (blogs.length === 0) {
    return;
  }
  const content = blogs.map((blog) => ([{
    tag: 'a',
    text: `• ${blog.title}`,
    href: blog.link,
  }]));

  return request
    .post(`https://open.feishu.cn/open-apis/bot/v2/hook/${token}`)
    .send({
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: title,
            content: content,
          },
        },
      },
    })
    .then((res) => {
      console.log('lark got ' + JSON.stringify(res.body));
      return res;
    });
}

module.exports = {
  send,
};

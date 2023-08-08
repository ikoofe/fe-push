const request = require("superagent");

async function send({ blogs, title, token }) {
  if (blogs.length === 0) {
    return;
  }
  const content = blogs.map((blog) => `[• ${blog.title}](${blog.link})`).join('\n');
  return request
    .post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`)
    .send({
      msgtype: "markdown",
      markdown: {
        content: `## ${title}\n` + content,
      },
    })
    .then((res) => {
      console.log("wecom got " + JSON.stringify(res.body));
      return res;
    });
}

module.exports = {
  send,
};

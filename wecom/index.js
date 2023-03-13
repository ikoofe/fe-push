const request = require("superagent");
const config = require("config");

function send({blogs, title, token}) {
  if (blogs.length === 0) {
    return;
  }
  request
    .post(
      `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`
    )
    .send({
      msgtype: "markdown",
      markdown: {
        content: `## ${title}\n` + blogs.join("\n"),
      },
    })
    .then((res) => {
      console.log("yay got " + JSON.stringify(res.body));
    });
}

module.exports = {
  send,
};
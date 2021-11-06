const request = require("superagent");
const config = require("config");

function send({blogs, title, dingToken}) {
  if (blogs.length === 0) {
    return;
  }
  request
    .post(
      `https://oapi.dingtalk.com/robot/send?access_token=${dingToken}`
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

module.exports = {
  send,
};
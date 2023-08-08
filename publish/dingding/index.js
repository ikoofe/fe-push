const request = require("superagent");

async function send({ blogs, title, token }) {
  if (blogs.length === 0) {
    return;
  }
  const content = blogs
    .map((blog) => `- [${blog.title}](${blog.link})`)
    .join("\n");

  return request
    .post(`https://oapi.dingtalk.com/robot/send?access_token=${token}`)
    .send({
      msgtype: "markdown",
      markdown: {
        title: title,
        text: `## ${title} ##\n` + content,
      },
    })
    .then((res) => {
      console.log("dingding got " + JSON.stringify(res.body));
      return res
    });
}

module.exports = {
  send,
};

const request = require("superagent");
const moment = require("moment");

const ignoreTagIds = [
  6809637767543259144, // 面试
];
const ignoreWord = /招|试|历/;

module.exports = () => {
  return request
    .post("https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed")
    .send({
      id_type: 2,
      sort_type: 3, // 3,
      cate_id: "6809637767543259144",
      cursor: "0",
      limit: 20,
    })
    .then((res) => {
      const endTime = moment().add(-1, "days") / 1000;
      const startTime = moment().add(-2, "days") / 1000;
      const { data = [] } = res.body;
      const blogs = data
        .filter((item) => {
          const { article_info = {} } = item;
          const { ctime, tag_ids, title, brief_content } = article_info;

          if (+ctime > endTime || +ctime < startTime) {
            return false;
          }

          const hasIgnoreTag = tag_ids.some((tag) =>
            ignoreTagIds.includes(tag)
          );
          if (hasIgnoreTag) {
            return false;
          }

          const hasIgnoreWord =
            ignoreWord.test(title) || ignoreWord.test(brief_content);
          if (hasIgnoreWord) {
            return false;
          }

          return true;
        })
        .map((item) => {
          const { article_info = {}, article_id } = item;
          const { title } = article_info;
          return {
            title: `${title} - 掘金`,
            link: `https://juejin.cn/post/${article_id}`,
          };
        });

      return blogs;
    });
};

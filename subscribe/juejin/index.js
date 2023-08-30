const request = require('superagent');
const moment = require('moment');
const rules = require('./rules');

module.exports = () => {
  return request
    .post('https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed')
    .send({
      id_type: 2,
      sort_type: 3,
      cate_id: rules.cateId || '6809637767543259144', // 前端
      cursor: '0',
      limit: 20,
    })
    .then((res) => {
      const startTime = +moment({ hour: 0, minute: 0, seconds: 0 }).add(-2, 'days') / 1000;
      const endTime = +moment({ hour: 0, minute: 0, seconds: 0 }).add(-1, 'days') / 1000;
      const { data = [] } = res.body;
      const blogs = data
        .filter((item) => {
          const { article_info = {} } = item;
          const { ctime, tag_ids, title, brief_content } = article_info;
          if (+ctime > endTime || +ctime < startTime) {
            return false;
          }

          const isIgnoreTag = tag_ids.some((tag) => rules.ignoreTagIds.includes(tag));
          if (isIgnoreTag) {
            return false;
          }

          const isIgnoreWord = rules.ignoreWord.test(title) || rules.ignoreWord.test(brief_content);
          if (isIgnoreWord) {
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
    }).catch((error) => {
      console.log('get juejin blogs error: ', error)
      return [];
    });
};

const getJuejin = require('./juejin');
const getRSS = require('./rss');

module.exports = async () => {
  const rsss = await getRSS().catch(() => []);
  const juejins = await getJuejin().catch(() => []);
  return [...rsss, ...juejins];
};
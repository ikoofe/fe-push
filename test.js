const subscribe = require('./subscribe');
const publish = require('./publish');

(async () => {
  const blogs = await subscribe();
  const error = await publish(blogs);

  if (error) {
    console.log(error);
  }
})();

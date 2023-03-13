(async () => {
  const juejinList = await getJuejinPost().catch(() => []);
  const cnRSSList = await getRSSPost('cn').catch(() => []);
  const enRSSList = await getRSSPost('en').catch(() => []);

  const blogs = [...cnRSSList, ...enRSSList, ...juejinList];

  console.log(blogs)
})()
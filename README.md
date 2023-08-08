## 文章订阅

该项目用于前端技术文章定时推送，支持掘金推荐和 RSS 订阅的技术文章。

### 掘金推荐

通过接口 `https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed` 获取推荐的文章，并且过滤了标题中包含 `招`、`试`、`历` 的文章。

### RSS 订阅

访问 RSS 的 Feed 来获取最新的文章，目前支持以下几个 Feed：

```
  'https://css-tricks.com/feed/',
  'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml',
  'https://cprss.s3.amazonaws.com/react.statuscode.com.xml',
  'https://www.developerway.com/rss.xml',
  'https://humanwhocodes.com/feeds/blog.xml',
  'https://mdhweekly.com/rss.xml',
  'https://mdhweekly.com/articles.xml'
```

当然，也可以增加 Feed，在 `./subscribe/rss/feeds.json` 中添加即可。

## 文章推送

目前支持钉钉推送和微信推送。

### 钉钉推送

需要在钉钉群里添加机器人，并将 token 配置到 config 文件中：

```JSON
{
  "dingToken": "this-is-your-token",
}
```

### 微信推送

需要将微信群的名称配置到 config 文件中：

```JSON
{
  "wechatToken": "xxx群"
}
```

项目启动之后需要微信扫码。

### 企业微信

```JSON
{
  "wecomToken": "this-is-your-token"
}
```

## 注意事项

微信推送使用了 [webchaty](http://wechaty.js.org/)，这个库以及相关依赖最近更新比较频繁，需要将版本锁死，否则的话可能出报错。Node.js 版本为 v16.13.0，低于这个版本有可能代码报错。

如果 `sharp-libvips` 这个库安装较慢，可以做如下设置：

```shell
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```

如果 npm install 的时候报一下错误信息： `Failed to set up Chromium r982053! Set "PUPPETEER_SKIP_DOWNLOAD" env ...`


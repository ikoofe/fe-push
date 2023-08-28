npm install pnpm pm2 -g
pnpm i
pm2 stop fe-rss
pm2 start ./pm2.json

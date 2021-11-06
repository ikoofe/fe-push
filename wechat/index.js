/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/wechaty/wechaty
 */

const qrTerm = require('qrcode-terminal');
const Wechaty = require('wechaty');

const { ScanStatus, WechatyBuilder, log } = Wechaty;

function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrTerm.generate(qrcode, { small: true });  // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('');

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl);
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  }
}

function onLogin (user) {
  log.info('StarterBot', '%s login', user);
}

function onLogout (user) {
  log.info('StarterBot', '%s logout', user);
}

async function onMessage (msg) {
  log.info('StarterBot', msg.toString());

  if (msg.text() === 'ding') {
    await msg.say('dong')
  }
}

const bot = WechatyBuilder.build({
  name: 'wechat-bot',
  /**
   * Specify a `puppet` for a specific protocol (Web/Pad/Mac/Windows, etc).
   *
   * You can use the following providers:
   *  - wechaty-puppet-hostie
   *  - wechaty-puppet-wechat
   *  - wechaty-puppet-padplus
   *  - etc.
   *
   * Learn more about Wechaty Puppet Providers at:
   *  https://github.com/wechaty/wechaty-puppet/wiki/Directory
   */

  // puppet: 'wechaty-puppet-hostie',
  puppet: 'wechaty-puppet-wechat',

})

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))


module.exports = {
  send: async function ({topic, title, text}) {
    const room = await bot.Room.find({ topic })
    log.info((room || '').toString())
    if (room) {
      await room.say(`${title}\n${text}`)
    }
  }
};
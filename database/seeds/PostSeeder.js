'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Post = use('App/Models/Post')

class PostSeeder {
  async run () {
    const posts = [
      { title: '学好英文', content: '每天坚持学习英文短语5条以上，为以后打下基础。', user_id: 1},
      { title: '学习adonis', content: '构建一个基础的服务框架，作为后端服务程序，为后面开发服务做好铺垫。', user_id: 1},
      { title: '每天打卡', content: '口袋阅虽然还没发货，不过也要做好每天打卡的准备。', user_id: 2},
      { title: '不玩游戏', content: '减少游戏所耗费的时间，用于学习之中，为实现人生目标加油。', user_id: 2},
    ]

    await Post.createMany(posts)
  }
}

module.exports = PostSeeder

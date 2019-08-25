'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
class UserSeeder {
  async run () {
    const users = [
      { username: '张三', email: 'z3@gmai.com', password: '11111'},
      { username: '李四', email: 'l4@gmai.com', password: '22222'},
      { username: '王五', email: 'w5@gmai.com', password: '33333'},
      { username: '老刘', email: 'l6@gmai.com', password: '44444'},
    ]
    
    // 同时创建多个数据
    await User.createMany(users)

    // 在命令行运行来创建seed数据
    // adonis seed --files UserSeeder.js
  }
}

module.exports = UserSeeder

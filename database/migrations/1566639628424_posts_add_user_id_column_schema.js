'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsAddUserIdColumnSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.integer('user_id').unsigned()
      // 设置外健
      table.foreign('user_id').references('users.id')
      // alter table
    })
  }

  down () {
    this.table('posts', (table) => {
      // 删除外健
      table.dropForeign('user_id')
      // 删除栏
      table.dropColumn('user_id')
      // reverse alternations
    })
  }
}

module.exports = PostsAddUserIdColumnSchema

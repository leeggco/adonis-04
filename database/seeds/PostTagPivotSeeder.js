'use strict'

/*
|--------------------------------------------------------------------------
| PostTagPivotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class PostTagPivotSeeder {
  async run () {
    await Database
      .table('post_tag')
      .insert([
        { post_id: 14, tag_id: 2 },
        { post_id: 14, tag_id: 1 },
        { post_id: 15, tag_id: 2 },
        { post_id: 16, tag_id: 1 },
        { post_id: 17, tag_id: 1 },
        { post_id: 17, tag_id: 2 },
      ])
  }
}

module.exports = PostTagPivotSeeder

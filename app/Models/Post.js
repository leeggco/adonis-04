'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
	tags () {
		// 一对多
		return this.belongsToMany('App/Models/tag')
	}

	user() {
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Post

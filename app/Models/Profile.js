'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profile extends Model {
	user () {
		// 表示属于某个对象
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Profile

import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection} from './models/models'

const DISH_STORE = _.extend(Backbone.Events, {
	data: {
		collection: new DishCollection(),
		viewType: 'all',
		formTitle: ''

	},

	_emitChange: function () {
		this.trigger('updateContent')

	},

	_getData: function () {
		return _.clone(this.data) //>>> controls state
	},

	_initialize: function () {
		this.data.collection.on('sync update', this._emitChange.bind(this))
	},

	setStore: function(prop, payload){
		if(typeof this.data[prop] === 'undefined') {
			throw Error(`'${prop}' data-property not defined on store, pls define at start of application`)
		}
		this.data[prop] = payload
		this._emitChange()

	}
})

DISH_STORE._initialize()

export default DISH_STORE
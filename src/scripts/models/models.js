import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

export const DishModel = Backbone.Model.extend({
	urlRoot: '/api/dishes', //>>> urlRoot keyword allows additions to url based on api action you want to do
	idAttribute: '_id'
})

// export const DishCollection = Backbone.Collection.extend ({
// 	model: DishModel,
// 	url: '/api/user/dishes'

// })

export const DishCollection = Backbone.Collection.extend ({
	model: DishModel,
	url: '/api/dishes'

})



// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
export const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})


UserAuthModel.register = function(userData) {
	return $.ajax({
		type: 'post',
		url: '/auth/register',
		data: userData
	})
}

UserAuthModel.login = function(email,password) {
	return $.ajax({
		type: 'post',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
	},(err)=> {console.log(err.responseText)})
}

UserAuthModel.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

UserAuthModel.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ^^ DO NOT TOUCH ^^

// but, you may extend the UserAuthModel (which is a Backbone Model)
export const User = UserAuthModel.extend({
	initialize: function(){

	}
})

export { User, DishModel, DishCollection }

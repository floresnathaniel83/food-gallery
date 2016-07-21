import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import Header from './views/Header'
import LoginView from './views/LoginView'
import DishesView from './views/LoginView'
import ComposeView from './views/LoginView'
import MyDishesView from './views/LoginView'


const app = function() {

	var AppRouter = Backbone.Router.extend ({
		routes: {
			'home' : 'homeHandler',
			'dish/postDishes' : 'postDishHandler',
			'dish/myDishes' : 'myDishHandler',
			'login' : 'loginHandler',
			'*catchall':'redirect'


		},

		homeHandler: function () {
			ReactDOM.render(<DishesView />, document.querySelector('.container'))

		},

		postDishHandler: function () {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))

		},

		myDishHandler: function () {
			ReactDOM.render(<MyDishesView />, document.querySelector('.container'))

		},

		loginHandler: function () {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))

		},

		redirect: function () {
			location.hash = 'home'
		},

		initialize: function () {
			Backbone.history.start()

		}

	})

new AppRouter()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginView'
import Dashboard from './views/dashboard'
import DishesView from './views/dishesView'
import ComposeView from './views/composeView'
import {User, DishModel} from './models/models'


//STEP 5 (build your client side api routes)
const app = function() {

    var AppRouter = Backbone.Router.extend ({
        routes: {
            'home': 'goHome',
            'dish/postDishes': 'handleDishPost', // VVV these routes were determined by the routes we used in the Header
            'dish/myDishes': 'handleMyDishes',
            'login': 'handleLogin',
            '*catchall': 'redirectHome'
        },

        goHome: function() {
            ReactDOM.render(<Dashboard routedFrom = 'home' />, document.querySelector('.container')) //don't need to pass anything onto props because we will be doing that in the store
        },

        handleDishPost: function() {
            ReactDOM.render(<ComposeView />, document.querySelector('.container'))
        },

        handleMyDishes: function() {
            ReactDOM.render(<Dashboard routedFrom = 'dish/myDishes' />, document.querySelector('.container'))
        },

        handleLogin: function() {
            ReactDOM.render(<LoginView />, document.querySelector('.container'))
        },

        redirectHome: function() {
            location.hash = 'home'
        },

        initialize: function() { //good way to add logic to check if a user is logged in to protect certain routes
            Backbone.history.start()
            this.on('route', function (handlerName) {
                if(!User.getCurrentUser()) {
                    location.hash = 'login'
                } 
            })
        }
    })
    new AppRouter()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE.
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
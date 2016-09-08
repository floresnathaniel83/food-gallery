//STEP 6 (CREATE ACTIONS MODULE)

import {User, DishModel, DishCollection} from './models/models'
import DISH_STORE from './store'

const ACTIONS = {

    //WE WANT TO LOG THE USER IN IMMEDIATELY AFTER THEY REGISTER (AS LONG AS THEY REGISTER SUCCESFULLY) THE FIRST METHOD REGISTERS AND THE SECOND LOGS THEM IN
    //.then takes two callback functions, both of these methods use that to create either a 'success' function or a 'failure' function
    registerUser: function(userObj) { //input name doesn't actually matter, we just named it the same as the object that is getting passsed in for our own peace of mind
        User.register(userObj).then( () => ACTIONS.logUserIn(userObj.email, userObj.password),
            (error) => {
                alert('FAILURE TO REGISTER')
                console.log(error)
            }
        )

    },

    logUserIn: function(email, password) {
        User.login(email, password).then(
            (responseData) => {
                alert(`user ${email} logged in!`)
                console.log(responseData)
                location.hash = 'home' //want the page to re-route to the home page after successfull login
            },
            (error) => {
                alert('FAILURE LOGGING IN')
                console.log(error)
            }
        )
    },

    logUserOut: function() { // we want the page to reroute to the login page after a user has logged out (server keeps track os user being logged in with a 'session')
        User.logout().then(
            () => location.hash = 'login'
        )
    },

    saveDish: function(dishObj) {
        var dish = new DishModel(dishObj)
        dish.save().then(
            (responseData) => {
                alert('Thanks for submitting!!!')
                location.hash = 'home'
                console.log(responseData)
            },
            
            (error) => {
                alert('FAILURE')
                console.log(error)
            }
        )

    },

    // /api/dishes
    // /api/dishes?authorId=«_id»
    // /api/dishes?authorId=«_id»&tags=«my-tags»
    fetchDishes: function(queryObj) {
        DISH_STORE.data.collection.fetch({
            data: queryObj
        })

        

        // let dishesColl = new DishCollection()

        // dishesColl.fetch({
        //     data: queryObj
        // })

        // DISH_STORE.setStore('collection', 'yah sure')
    },

    deleteDishes: function (modelId) {
        let dish = DISH_STORE.data.collection.get(modelId)
        dish.destroy()


    },

    likeDish: function(dish, userObj) {
        console.log(User.getCurrentUser()._id)
        //dish.get('likes').push(userObj._id)
        dish.set({
            likes: dish.get('likes').concat(userObj._id)

        })

        dish.save()
        DISH_STORE.data.collection.fetch()

    },

    updateView: function(viewString) {
        DISH_STORE.set('viewType',viewString)
    }


}

export default ACTIONS
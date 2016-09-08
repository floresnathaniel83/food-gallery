import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {DishCollection} from '../models/models'
import {User} from '../models/models'
import $ from 'jquery'


const DishesView = React.createClass({
	getInitialState: function () {
	 	return DISH_STORE._getData()

	 },

	 componentWillMount: function () {
	 	ACTIONS.fetchDishes()
	 	DISH_STORE.on('updateContent', () => {
	 			this.setState(DISH_STORE._getData())
			})
	},

	componentWillUnmount: function () {
		DISH_STORE.off('updateContent')

	},

	render: function() {
		console.log(this.state)
		let collectionToSend = this.state.collection

		switch (this.state.viewType) {
			case "isUser":
				collectionToSend = this.state.collection.where({authorId: true})
				break
			case "isNotUser": 
				collectionToSend = this.state.collection.where({authorId: false})
		}


	 	return (
	 		<div className="dishesView" >
	 			<Header />
	 			<h3>my dishes</h3>
	 			<DishContainer coll={collectionToSend} />
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">
			</div>
			)
	}
})

const Dish = React.createClass({
	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
				
			</div>
			)
	}
})

export default DishesView

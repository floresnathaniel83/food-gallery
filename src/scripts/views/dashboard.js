import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({
	 
	 getInitialState: function () {
	 	return DISH_STORE._getData()

	 },

	 componentWillReceiveProps: function (newProps) {
	 	console.log('this.props: ', this.props)
	 	console.log('newProps: ', newProps)
	 	let queryForDishes
	 	if(newProps.routedFrom === 'dish/myDishes') {
	 		 queryForDishes = {'authorId' : User.getCurrentUser()._id}

	 	} else {
	 		 queryForDishes = {}

	 	}

	 	ACTIONS.fetchDishes(queryForDishes)



	 },

	 componentWillMount: function () {
	 	//console.log('getCurrentUser', User.getCurrentUser() )
	 	//console.log(this.props.routedFrom)
	 	let queryForDishes
	 	if(this.props.routedFrom === 'dish/myDishes') {
	 		 queryForDishes = {'authorId' : User.getCurrentUser()._id}

	 	} else {
	 		 queryForDishes = {}

	 	}
	 	
	 	ACTIONS.fetchDishes(queryForDishes)

	 	DISH_STORE.on('updateContent', () => {
	 			this.setState(DISH_STORE._getData())
			})
	},

	componentWillUnmount: function () {
		DISH_STORE.off('updateContent')

	},

	_handleTagSearch: function (evt) {

		if(evt.keyCode === 13) {
			console.log(evt.target.value)
			ACTIONS.fetchDishes(evt.target.value)
			evt.target.value = " "
		}
	},

	 render: function() {
	 	console.log(this.state)
	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 				<input onKeyDown = {this._handleTagSearch} type = 'text' placeholder = 'enter tag'/>
	 				<h3>dashboard</h3>
	 			<DishContainer dishColl = {this.state.collection}/>
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	
	render: function() {
		return (
			<div className="dishContainer">
				{this.props.dishColl.map(
					(model) => <Dish dishModel = {model} key = {model.id} />)}
			</div>
			)
	}
})

const Dish = React.createClass({
	_handleLikes: function () {
		ACTIONS.likeDish(this.props.dishModel, User.getCurrentUser())
	},

	render: function() {
		return (
			<div className="dish">
				<p>user: {this.props.dishModel.get('authorEmail')}</p>
				<p>title: {this.props.dishModel.get('title')}</p>
				<p>description: {this.props.dishModel.get('description')}</p>
				<img src = {this.props.dishModel.get('imageUrl')}/>
				<p>location: {this.props.dishModel.get('location')}</p>
				<p>tags: {this.props.dishModel.get('tags')}</p>
				<p>rating: {this.props.dishModel.get('rating')}</p>
				<p>likes: {this.props.dishModel.get('likes').length}</p>
				<button onClick = {this._handleLikes}>like</button>
			</div>
			)
	}
})

export default Dashboard

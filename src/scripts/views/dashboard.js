import React from 'react'
import Header from './header'
import DISH_STORE from '../store'

const Dashboard = React.createClass({
	 
	 getInitialState: function () {
	 	return DISH_STORE._getData()

	 },

	 componentWillMount: function () {
	 	DISH_STORE.on('updateContent', () => {
	 			this.setState(DISH_STORE._getData())
			})
	},

	componentWillUnmount: function () {
		DISH_STORE.off('updateContent')

	},

	 render: function() {
	 	return (
	 		<div className='dashboard' >
	 			<Header />
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
	render: function() {
		return (
			<div className="dish">
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
			</div>
			)
	}
})

export default Dashboard

import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({
	
	_handleCompose: function (e) {
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: e.currentTarget.rating.value,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '../assets/images/empty-plate.jpg'
		})

	},

	_handleImage: function (result) {
		//console.log(result) test make sure it works
		this.url = result.url //


	},

	render: function() {
		return (
			
			<div className="dishPostingForm">
				<form onSubmit = {this._handleCompose}> 
					<input type = 'text' name = 'title' placeholder = 'Enter the dish title' />
					<textarea type = 'text' name = 'description' placeholder = 'Enter description'></textarea>
					<input type = 'text' name = 'location' placeholder = 'Enter location'/>
					<input type = 'text' name = 'rating' placeholder = 'Rate Us'/>
					<ReactFilepicker apikey= 'A0hkVciLxQAuC7SR2RhKDz' onSuccess={this._handleImage}/>
					<button type = 'submit'>Submit</button>
				</form>
			</div>
			)
	}
})

export default ComposeView

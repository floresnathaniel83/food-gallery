import {User} from './models/models'

const ACTIONS = {
	registerUser: function (userObj) {
		User.register(userObj).then(()=>this.logUserIn(userObj.email, userObj.password)),
		(err)=>{
			alert('failure to register')

		}
	},

	logUserIn: function (email, password){
		User.login(email, password).then(
			()=> {
					alert(`user ${email} logged in!`) //>>>.then takes two arguments success and failure
					console.log(resp);
					location.hash='home'
				},
				
				(err)=> {

					alert('failure logging in')
					console.log(err)
				})
		}
},

	logUserOut: function() {
		User.logout().then(
			()=> location.hash='login'
		)
	}

export default ACTIONS
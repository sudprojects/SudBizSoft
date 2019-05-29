import React from 'react';
import { NavLink } from 'react-router-dom';

class Register extends React.Component {

constructor(props){
  super(props);
  this.state = {
    email: '',
    password: '',
    name:''
  }
}

//detecting value and setting state for Name 
onNameChange = (event) =>{
this.setState({name: event.target.value})

}

//detecting value and setting state for Email 
onEmailChange = (event) =>{
this.setState({email: event.target.value})

}

//detecting value and setting state for Password 
onPasswordChange = (event) =>{
this.setState({password: event.target.value})

}

//Storing order details in db when user clicks submit.  
onSubmitSignIn = () =>{
  fetch('https://bizserver.herokuapp.com/register', {
    method:'post',
    headers:{'Content-type': 'application/json'},
    body:JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    })
  })
  .then(response => response.json())
  .then(user => {

    if (user){
      this.props.loadUser(user)
       //this.props.onRouteChange('home');
    }
  })
 
}


//Using Tachyons for register form
render(){
return (
<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"  
        id="name"
        onChange = {this.onNameChange} />
      </div>

           <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address"
        onChange = {this.onEmailChange} />
      </div>

      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
        onChange = {this.onPasswordChange} />
      </div>
  
    </fieldset>
    <div className="">
      <NavLink to = '/home'>
      <input 
      onClick = {this.onSubmitSignIn}
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      type="submit"
      value="Register" />
      </NavLink>
    </div>

  </div>
</main>
</article>
  );

}

}

export default Register;
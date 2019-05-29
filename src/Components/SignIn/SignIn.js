import React from 'react';
import { NavLink } from 'react-router-dom';

class Signin extends React.Component {

constructor(props){
  super(props);
  this.state = {
    signInEmail: '',
    signInPassword: ''
  }
}

//detecting value and setting state for Email 
onEmailChange = (event) =>{
this.setState({signInEmail: event.target.value})

}

//detecting value and setting state for Password 
onPasswordChange = (event) =>{
this.setState({signInPassword: event.target.value})

}

//Fetching user details from db when user clicks submit/SignIn.
onSubmitSignIn = () =>{
  fetch('https://bizserver.herokuapp.com/signin', {
    method:'post',
    headers:{'Content-type': 'application/json'},
    body:JSON.stringify({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    })
  })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
         // this.props.onRouteChange('home');
        }
      })
}

render(){

return (
<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
      value="Sign in" />
      </NavLink>
    </div>
    <div className="lh-copy mt3">
      <NavLink to = '/home/register'>
      <p className="f6 link dim black db pointer">Register</p>
      </NavLink>
    
    </div>
  </div>
</main>
</article>
  );
}



}

export default Signin;
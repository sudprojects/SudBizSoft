import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';



const Navigation = ({ onRouteChange, profile }) => {

	// return (

	// 		<div>
	// 		<p onClick = {() => onRouteChange('SignIn')}>Sign Out</p>
	// 		<p> profile {profile.name} </p>
	// 		</div>

	// 	);

	return(
	<div>
		{console.log('Inside nav component')}
		<header className="bg-black-90 fixed w-100 ph3 pv3 pv1-ns ph4-m ph5-l">
 		<nav className="f6 fw6 ttu tracked">
   		<p className="link dim white dib mr3" title="Home">Home</p>
		    <NavLink to = '/home/create'>
		    	 <p className="link dim white dib mr3 pointer" title="Create Order" >Create Order</p>
		    </NavLink>
		  
		  	 <NavLink to = '/home/add'>
		   		 <p className="link dim white dib mr3 pointer" title="Add Product">Add Product</p>
		     </NavLink>

		     <NavLink to = '/home/search'>
		   		 <p className="link dim white dib mr3 pointer" title="Search" >Search</p>
		    </NavLink>
		    
		    <NavLink to = '/'>
		    	<p className="link dim white dib mr3 pointer" title="Sign Out" >Sign Out</p>
		    </NavLink>
  		</nav>
	  </header>
	</div>
		);

}

export default Navigation;
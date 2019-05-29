import React from 'react';
import Navigation from '../Navigation/Navigation'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, FormFeedback, tooltip, Alert } from 'reactstrap';
import '../CreateOrder/CreateOrder.css';
import ls from 'local-storage';

class AddProduct extends React.Component {

		state = {

		product_name: '',
		cost_to_company: '',
		notes:'',
		products: [],
		myuser:'',
		visible:false,
		onDismiss:false,
	}

componentDidMount() {
	var loggedInUser = ls.get('lsuserid');
	this.setState({myuser:loggedInUser});
	
	
  }

clearValues = () =>{

	//document.getElementById('product_name').value = '';
	document.getElementById('product_name').value = '';
	document.getElementById('total_price').value = '';
	document.getElementById('notes').value = '';

	}

//For dismissing alert
onDismiss() {
    this.setState({ visible: false });
  }

//detecting value and setting state for Product Name
onPNChange = (event) =>{
this.setState({product_name: event.target.value})

}

//detecting value and setting state for "Cost to Company"
onCTCChange = (event) =>{
this.setState({cost_to_company: event.target.value})

}

//detecting value and setting state for "Notes"
onNotesChange = (event) =>{
this.setState({notes: event.target.value})

}

//Storing product details in db when user clicks submit. Also clearing input values & showing alert message to user 
	onButtonSubmit = () => {
	
			fetch('https://bizserver.herokuapp.com/addProduct', {
		            method: 'post',
		            headers: {'Content-Type': 'application/json'},
		            body: JSON.stringify({
		              product_name: this.state.product_name,
		              cost_to_company: this.state.cost_to_company,
		              notes: this.state.notes,
		              user_id: this.state.myuser
		            })
		          })
			.then(response => response.json())
			.then(product => {
			
				console.log(product);

			})
			this.clearValues();
			this.setState({visible:true});
 			this.onDismiss = this.onDismiss.bind(this);
		}


//Rendering UI, using reactstrap for form
render(){

	return(

		<div>
		
		 <Navigation />
		 <h3 className = 'headers'>Add Product</h3>
		 <div className = 'myform'>
		 
		  <FormGroup row>
			          <Label for="exampleEmail" sm={2}>Product Name</Label>
			          <Col sm={3}>
			            <Input type="text" name="product_name" id="product_name" placeholder="Enter product Name" onChange = {this.onPNChange} />
			          </Col>
			        </FormGroup>

			        <FormGroup row>
			          <Label for="examplePassword" sm={2}>Cost to Company</Label>
			          <Col sm={1}>
			            <Input type="text" name="cost_to_company" id="total_price" placeholder="CTC" onChange = {this.onCTCChange} />
			          </Col>
			        </FormGroup>

					<FormGroup row>
			          <Label for="exampleText" sm={2}>Notes</Label>
			          <Col sm={3}>
			            <Input type="textarea" name="text" id="notes" onChange = {this.onNotesChange} />
			          </Col>
			        </FormGroup>

			        <FormGroup check row>
			          <Col sm={{ size: 3, offset: 2 }}>
			            <Button type="submit" color="primary" onClick = {this.onButtonSubmit}>Submit</Button>
			          </Col>
			        </FormGroup>
		 </div>

		 			 <Alert className = 'alert' color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
					        Product successfully added
					 </Alert> 
		</div>

		)
}

}

export default AddProduct;
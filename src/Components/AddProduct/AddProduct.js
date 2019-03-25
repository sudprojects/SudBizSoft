import React from 'react';
import Navigation from '../Navigation/Navigation'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, FormFeedback, tooltip } from 'reactstrap';
import '../CreateOrder/CreateOrder.css';

class AddProduct extends React.Component {

		state = {

		product_name: '',
		cost_to_company: '',
		notes:'',
		products: []
	}


onPNChange = (event) =>{
this.setState({product_name: event.target.value})

}

onCTCChange = (event) =>{
this.setState({cost_to_company: event.target.value})

}

onNotesChange = (event) =>{
this.setState({notes: event.target.value})

}

	onButtonSubmit = () => {
	
			fetch('https://bizserver.herokuapp.com/addProduct', {
		            method: 'post',
		            headers: {'Content-Type': 'application/json'},
		            body: JSON.stringify({
		              product_name: this.state.product_name,
		              cost_to_company: this.state.cost_to_company,
		              notes: this.state.notes,
		              user_id: this.props.user
		            })
		          })
			.then(response => response.json())
			.then(product => {
			
				console.log(product);

			})
		}



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
			            <Input type="textarea" name="text" id="exampleText" onChange = {this.onNotesChange} />
			          </Col>
			        </FormGroup>

			        <FormGroup check row>
			          <Col sm={{ size: 3, offset: 2 }}>
			            <Button type="submit" color="primary" onClick = {this.onButtonSubmit}>Submit</Button>
			          </Col>
			        </FormGroup>



		 </div>

		</div>

		)
}

}

export default AddProduct;
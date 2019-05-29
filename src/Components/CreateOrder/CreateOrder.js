import React from 'react';
import './CreateOrder.css';
import Navigation from '../Navigation/Navigation';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, FormFeedback, tooltip, Alert } from 'reactstrap';
import Select from 'react-select';
import ls from 'local-storage';

class CreateOrder extends React.Component {

	state = {
		product_name: undefined,
		number_of_units: undefined,
		total_price: undefined,
		notes:'',
		visible:false,
		onDismiss:false,
		myuser:undefined,
		options: []
	}


	clearValues = () =>{

	//document.getElementById('product_name').value = '';
	document.getElementById('number_of_units').value = '';
	document.getElementById('total_price').value = '';
	document.getElementById('notes').value = '';

	}

componentDidMount() {
	var loggedInUser = ls.get('lsuserid');
	this.setState({myuser:loggedInUser});
	this.productList(loggedInUser);
		
  }

//detecting value and setting state for Product Name
onPNChange = (event) =>{
this.setState({product_name: event.target.value});
this.setState({visible:false});
}

//detecting value and setting state for "number of units"
onUnitsChange = (event) =>{
this.setState({number_of_units: event.target.value})

}

//detecting value and setting state for "total_price" 
onPriceChange = (event) =>{
this.setState({total_price: event.target.value})

}

//detecting value and setting state for "Notes" 
onNotesChange = (event) =>{
this.setState({notes: event.target.value})

}

//Storing order details in db when user clicks submit. Also clearing input values & showing alert message to user 
	onButtonSubmit = () => {
	
	fetch('https://bizserver.herokuapp.com/addOrders', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              product_name: this.state.product_name,
              number_of_units: this.state.number_of_units,
              total_price: this.state.total_price,
              notes: this.state.notes,
              user_id: this.state.myuser

            })
          })
	.then(response => response.json())
	.then(order => {

		console.log(order);
	})

 	this.clearValues();
 	this.setState({visible:true});
 	this.onDismiss = this.onDismiss.bind(this);

}

//For dismissing alert
onDismiss() {
    this.setState({ visible: false });
  }

//This function is used to get the latest product list from db. This is called in componentDidMount() so that 
//when user comes to this page, latest product list is loaded
productList = (loggedInUser) => {

			fetch('https://bizserver.herokuapp.com/productList', {
		            method: 'post',
		            headers: {'Content-Type': 'application/json'},
		            body: JSON.stringify({
		              user_id: loggedInUser
		            })
		          })
			.then(response => response.json())
			.then(products => {
				this.setState({options: products.map((product,i) => product.product_name)})
				this.setState({ product_name: this.state.options[0] });
				console.log('1st option:', this.state.options[0]);
			})
			console.log('saveduserproduct:', loggedInUser);
}

//Rendering UI, using reactstrap for form
	render(){

	return (
			<div>
			 <Navigation />
			 <h3 className = 'headers'>Create Order</h3>
			 <div className = 'myform'>

				<div>
			       
			       	 <FormGroup row>
			          <Label for="exampleSelect" sm={2}>Product Name</Label>
			          <Col sm={3}>
			            <Input type="select" name="select" id="exampleSelect" onChange = {this.onPNChange} size ="5"> 
				          {this.state.options.map((option, i) => <option key = {i}>{option}</option>)}
	          			</Input>
			          </Col>
			        </FormGroup>

			        <FormGroup row>
			          <Label for="exampleEmail" sm={2}>Number of Units</Label>
			          <Col sm={1}>
			            <Input type="text" name="number_of_units" id="number_of_units" placeholder="1/2/3" onChange = {this.onUnitsChange} />
			          </Col>
			        </FormGroup>

			        <FormGroup row>
			          <Label for="examplePassword" sm={2}>Total Price</Label>
			          <Col sm={1}>
			            <Input type="text" name="total_price" id="total_price" placeholder="Price" onChange = {this.onPriceChange} />
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
			             <Button className = 'mymargin' type="submit" color="primary" onClick = {this.productList}>Load Product List</Button>
			            
			          </Col>
			        </FormGroup>



			     </div>
		        </div>
		       			              <Alert className = 'alert' color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
					        Order successfully created
					      </Alert>      
			 </div>
		);

	}

}

export default CreateOrder;
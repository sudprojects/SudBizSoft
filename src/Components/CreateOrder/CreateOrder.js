import React from 'react';
import './CreateOrder.css';
import Navigation from '../Navigation/Navigation';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, FormFeedback, tooltip, Alert } from 'reactstrap';
import Select from 'react-select';
import ls from 'local-storage';

const options1 = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const options = [
  'one', 'two', 'three'
]


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
	//console.log('loggedInUser',loggedInUser)
	this.productList(loggedInUser);
	
	
  }

onPNChange = (event) =>{
this.setState({product_name: event.target.value});
this.setState({visible:false});
}

onUnitsChange = (event) =>{
this.setState({number_of_units: event.target.value})

}

onPriceChange = (event) =>{
this.setState({total_price: event.target.value})

}

onNotesChange = (event) =>{
this.setState({notes: event.target.value})

}

	onButtonSubmit = () => {

	
	fetch('http://localhost:3000/addOrders', {
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

onDismiss() {
    this.setState({ visible: false });
  }


productList = (loggedInUser) => {

			fetch('http://localhost:3000/productList', {
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

/*
DB
order_id
user_id
product_name
number_of_units
total_price
notes
order_date

*/

/*

			<div  className = 'myflex'>
			
			<p  className = 'ifield' ><label>Product Name: </label><input type = 'text' onChange = {this.onPNChange} /></p>
			<p  className = 'ifield' ><label>Number of units: </label><input type = 'text' onChange = {this.onUnitsChange} /></p>
			<p><label>Total price: </label><input type = 'text' onChange = {this.onPriceChange} /></p>
			<p><label>Notes: </label><input type = 'text' onChange = {this.onNotesChange} /></p>
			{console.log('inside CreateOrder page')}
			<button className="mv2 pv2 ph3 pointer b br2 hover-bg-dark-green bg-green white bn f7 ttu tracked w-3 center"
					type="submit" onClick = {this.onButtonSubmit}>Create Order</button>
			</div>


*/

/*
			        <Select
				        value= 'Chocolate'
				        onChange={this.handleChange}
				        options={this.state.options}
				     />

*/

				//this.setState({products: products})
				//const map2 = map1.map(x => <option key={x.key} value={x.key}>{x.value}</option>)
				//const map2 = map1.map(x => `{value: '${x}', label: '${x}'}` );
				//const map2 = map1.map(x =>  <option>x</option> );

				//console.log('list', this.state.products);
				//console.log(map2);
			
				//console.log('options1:', options1);
				//console.log('options:', this.state.options);

				//this.state.options = products.map((product,i) => product.product_name);
				//const map1 = products.map((product,i) => product.product_name);
				//console.log('map1',map1);
				//this.setState({options: map1})

/* <FormGroup row>
			          <Label for="exampleEmail" sm={2}>Product Name</Label>
			          <Col sm={3}>
			            <Input type="text" name="product_name" id="product_name" placeholder="Enter product Name" onChange = {this.onPNChange} />
			          </Col>
			        </FormGroup>

			        */
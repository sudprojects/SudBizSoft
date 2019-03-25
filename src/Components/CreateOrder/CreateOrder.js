import React from 'react';
import './CreateOrder.css';
import Navigation from '../Navigation/Navigation';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, FormFeedback, tooltip } from 'reactstrap';
import Select from 'react-select';

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

		product_name: '',
		number_of_units: '',
		total_price: '',
		notes:'',
		options: []
	}


onPNChange = (event) =>{
this.setState({product_name: event.target.value})

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

	
	fetch('https://bizserver.herokuapp.com/addOrders', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              product_name: this.state.product_name,
              number_of_units: this.state.number_of_units,
              total_price: this.state.total_price,
              notes: this.state.notes,
              user_id: this.props.user

            })
          })
	.then(response => response.json())
	.then(order => {

		console.log(order);
	})
}


productList = () => {

			fetch('https://bizserver.herokuapp.com/productList', {
		            method: 'post',
		            headers: {'Content-Type': 'application/json'},
		            body: JSON.stringify({
		              user_id: this.props.user
		            })
		          })
			.then(response => response.json())
			.then(products => {
				this.setState({options: products.map((product,i) => product.product_name)})
			})
}

	render(){

	return (
			<div>
			 <Navigation />
			 <h3 className = 'headers'>Create Order</h3>
			 <div className = 'myform'>

				<div>
			        <FormGroup row>
			          <Label for="exampleEmail" sm={2}>Product Name</Label>
			          <Col sm={3}>
			            <Input type="text" name="product_name" id="product_name" placeholder="Enter product Name" onChange = {this.onPNChange} />
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
			            <Input type="textarea" name="text" id="exampleText" onChange = {this.onNotesChange} />
			          </Col>
			        </FormGroup>

			        <FormGroup row>
			          <Label for="exampleSelect" sm={2}>Select</Label>
			          <Col sm={3}>
			            <Input type="select" name="select" id="exampleSelect"> 
				          {this.state.options.map((option, i) => <option key = {i}>{option}</option>)}
	          			  

			            </Input>
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
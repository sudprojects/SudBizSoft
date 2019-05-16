import React from 'react';
import './SearchOrders.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Navigation from '../Navigation/Navigation';
import ls from 'local-storage';

class SearchOrders extends React.Component {

	state = {

		orders: []
	}
	


	onButtonSubmit = () => {

	var test = ls.get('lsuserid'); //LS
	console.log('test:', test); //LS
	fetch('http://localhost:3000/SearchOrders', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
             // user_id: this.props.user
             user_id: test //LS
            })
          })
	.then(response => response.json())
	.then(orders => {
		this.setState({orders: orders})
		console.log(orders);
		this.state.orders.forEach((record, i) =>
			
			console.log(this.state.orders[i].order_id)
			)

		})

	}

	render(){

	
	const columns = [

		{
			Header: "Order ID",
			accessor: "order_id",
			width: 100
			
		},

		{
			Header: "Product Name",
			accessor: "product_name",
			width: 300
			
		},

		{
			Header: "Number of Units",
			accessor: "number_of_units",
			width: 100
		},

		{
			Header: "Total Price",
			accessor: "total_price",
			width: 100
		},

		{
			Header: "Notes",
			accessor: "notes",
			style: {textAlign: 'left' }
		}

	]
	return (

			<div>
			<Navigation />
			<div className = 'mycss'>
			
			<button type = 'submit' onClick = {this.onButtonSubmit}> Show Orders</button>
			<ReactTable 
			columns = {columns}
			data = {this.state.orders}
			filterable
			noDataText = {'Please click Show Orders to see all orders'}
			defaultPageSize={5}
			/>
			</div>
			</div>
		);


	}
	


}

export default SearchOrders;



/*	<div>
				<thead>
			        <tr className="stripe-dark">
			          <th className="fw6 tl pa3 bg-white">Product Name</th>
			          <th className="fw6 tl pa3 bg-white">Number of Units</th>
			          <th className="fw6 tl pa3 bg-white">Total Price</th>
			          <th className="fw6 tl pa3 bg-white">Notes</th>
			        </tr>
			    </thead>
			</div>


			{
				this.state.orders.map((record, i) =>
					//<span key = {i}>{record.order_id}</span>
					<div>
						<tbody>
						<tr key = {i} className="stripe-dark">
				          <td className="fw6 tl pa3 bg-white">{record.product_name}</td>
				          <td className="fw6 tl pa3 bg-white">{record.number_of_units}</td>
				          <td className="fw6 tl pa3 bg-white">{record.total_price}</td>
				          <td className="fw6 tl pa3 bg-white">{record.notes}</td>
				        </tr>
				        </tbody>
					</div>

				)
			}

*/
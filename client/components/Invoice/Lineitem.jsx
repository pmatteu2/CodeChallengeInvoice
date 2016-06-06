import React, { Component } from 'react';


class Lineitem extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
    	quantity: 1,
    	price:this.props.item.defaultPrice
	}
  }
  componentWillMount(){
  	this.props.changeLineitemQuantity.call(this.props.invoice, this.state.quantity, this.props.index)
  	this.props.changeLineitemPrice.call(this.props.invoice, this.state.price, this.props.index)
  }

  handleQuantityChange(event){
  	console.log('holly',this)

  	this.setState({quantity: event.target.value});
  	console.log('this.state.quantity',this.state.quantity)
  	this.props.changeLineitemQuantity.call(this.props.invoice, event.target.value, this.props.index)
  }
   handlePriceChange(event){
  	console.log('holly',this)
  	this.setState({price: event.target.value});
  	this.props.changeLineitemPrice.call(this.props.invoice, event.target.value, this.props.index)
  }

  calculateItemTotal(){
  	return (Number(this.state.quantity)*Number(this.state.price)).toFixed(2)
  }

	render() {

	  	return (
	  		<div>
		  		{this.props.item.productName}
		  		<span> {"  "}</span>
		  		quantity:
		  		<input
			        type="text"
			        defaultValue = {this.state.quantity}
			        value = {this.state.quantity}
			        onChange={this.handleQuantityChange.bind(this)}
			    />
			    Price:
			    <input
			        type="text"
			        defaultValue = {this.props.item.defaultPrice}
			        value = {this.state.price}
			        onChange={this.handlePriceChange.bind(this)}
			    />
			    <span style = {{float:'right'}}>
			    	Total:
			    	${this.calculateItemTotal.call(this)}
			    </span>

	  		</div>

	  		)


  }
 }

export default Lineitem;
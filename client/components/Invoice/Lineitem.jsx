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

  //when quantity is changed, change state on the invoice
  handleQuantityChange(event){
  	//console.log('holly',this)
  	this.setState({quantity: event.target.value});
  	//console.log('this.state.quantity',this.state.quantity)
  	this.props.changeLineitemQuantity.call(this.props.invoice, event.target.value, this.props.index)
  }
  //when price is changed, change state on the invoice
   handlePriceChange(event){
  	//console.log('holly',this)
  	this.setState({price: event.target.value});
  	this.props.changeLineitemPrice.call(this.props.invoice, event.target.value, this.props.index)
  }

  //just multiply the quantity and price and fix to 2 digits
  calculateItemTotal(){
  	return (Number(this.state.quantity)*Number(this.state.price)).toFixed(2)
  }

	render() {

	  	return (
	  		<div>
	  			<span style = 
                  {{
                    width:200,
                    display:'inline-block'
                  }}>
		  			{this.props.item.productName}
		  		</span>
		  		<span style = 
		  			{{
                        width:200,
                        display:'inline-block'                   
                    }}>
			  		Quantity:
			  		<input
				        type="text"
				        defaultValue = {this.state.quantity}
				        value = {this.state.quantity}
				        onChange={this.handleQuantityChange.bind(this)}
				    />
			    </span>
			    <span>
				    Price:
				    <input
				        type="text"
				        defaultValue = {this.props.item.defaultPrice}
				        value = {this.state.price}
				        onChange={this.handlePriceChange.bind(this)}
				    />
			    </span>
			    <span style = {{float:'right'}}>
			    	Total:
			    	${this.calculateItemTotal.call(this)}
			    </span>
	  		</div>
	  		)
  }
 }

export default Lineitem;
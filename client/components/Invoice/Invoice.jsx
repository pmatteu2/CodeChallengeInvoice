import React, { Component } from 'react';
import Lineitem from './Lineitem';
import Search from './search';

class Invoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    //console.log('the beginning',this)
  }
  //runs before render
  componentWillMount(){
    //set default values when form opens, date does not work on 2nd open if its changed.
    //i regret setting up the invoice info object like this, it made updating it very complicated
    //would just save them seperately and add them together later if i did it again
    this.setState({
      invoiceInfo:{
        customerName:"",
        invoiceNumber:'',
        lineitems:[]
      },
      date:'2016-06-05'
    })

  }
  //runs after render
  //add event listeners
  componentDidMount(){
   // console.log('PJPJPJP')
    var dialog = document.getElementById('window');
    document.getElementById('show').onclick = function() {
        dialog.show();
    };
     document.getElementById('exit').onclick = function() {
        dialog.close();
    };
     document.getElementById('addInvoice').onclick = function() {
        dialog.close(); 
    };
  }

  //when add Item is clicked, add it to the invoice
  handleAddLineitem(index,event) {
    var array = Array.prototype.slice.call(arguments) 
    //console.log('add arguments',arguments)
    event.preventDefault();
    //console.log(this,'hi',this)
    var newLineitems = this.state.invoiceInfo.lineitems.concat(this.props.products[index])
    //console.log('something weird is going on',newLineitems)
    this.setState({
      invoiceInfo:{
        customerName:this.state.invoiceInfo.customerName,
        invoiceNumber:this.state.invoiceInfo.invoiceNumber,
        lineitems:newLineitems
      }
    })
    //console.log('after',this.props.INVOICE)
    var array = Array.prototype.slice.call(arguments) 
  }

  //when name is typed, update state
  handleNameChange(event) {
    //console.log('holly',event)
   // this.setState({name: event.target.value});
    this.setState({
      invoiceInfo:{
        customerName:event.target.value,
        invoiceNumber:this.state.invoiceInfo.invoiceNumber,
        lineitems:this.state.invoiceInfo.lineitems
      }
    })
  }

  //when submit is hit, add invoice to array of invoices by calling function from index
  handleSubmit(event) {
    event.preventDefault();
    this.props.addInvoice.call(this.props.that,this.state.invoiceInfo,this.state.date)
  }

  //when you click create invoice, reset the values to defaults
  handleShowDialog(event){
    event.preventDefault();
    this.setState({
      invoiceInfo:{
        customerName:"",
        invoiceNumber:'',
        lineitems:[]
      },
      date: '2016-06-05'

    })
   
  }

  //when invoice number is changed change state
  handleInvoiceNumberChange(event){
    this.setState({
      invoiceInfo:{
        customerName:this.state.invoiceInfo.customerName,
        invoiceNumber:event.target.value,
        lineitems:this.state.invoiceInfo.lineitems
      }
    })
  }

  //when date is changed, change state
  handleDateChange(event){
    //console.log('dateChange',event.target.value)
    this.setState({date:event.target.value})
  }

  //when quantity is typed in, change state
  changeLineitemQuantity(quantity,index){
    // console.log('cliq',this)
    // console.log(arguments)
    var tempLineitems = this.state.invoiceInfo.lineitems.slice();
    tempLineitems[index].quantity = quantity
    this.setState({
      invoiceInfo:{
        customerName:this.state.invoiceInfo.customerName,
        invoiceNumber:this.state.invoiceInfo.invoiceNumber,
        lineitems:tempLineitems
      }
    })
  }

  //when price is typed in change state
  changeLineitemPrice(price,index){
    //console.log('clip',this)
    var tempLineitems = this.state.invoiceInfo.lineitems.slice();
    tempLineitems[index].price = price
    this.setState({
      invoiceInfo:{
        customerName:this.state.invoiceInfo.customerName,
        invoiceNumber:this.state.invoiceInfo.invoiceNumber,
        lineitems:tempLineitems
      }
    })

  }


  render() {
    //if i had more time i would have not used inline style so much
    return (
     <div>
      <dialog id="window" style = {{width:700}}>
        <form>
          Customer Name:
          <input
            type="text"
            defaultValue = {this.state.invoiceInfo.customerName}
            value={this.state.invoiceInfo.customerName}
            onChange={this.handleNameChange.bind(this)}
          />
          <div> Date:
            <input
              type = 'date'
              defaultValue = '2016-06-05'
              value = {this.state.date}
              onChange = {this.handleDateChange.bind(this)}
            />
          </div>
          <div>Invoice Number:
            <input
              type="text"
              value={this.state.invoiceInfo.invoiceNumber}
              defaultValue = {this.state.invoiceInfo.invoiceNumber}
              lable = 'Invoice Number:'
              onChange={this.handleInvoiceNumberChange.bind(this)}
            />
          </div>
          <div>
            <Search products = {this.props.products} 
                    handleAddLineitem = {this.handleAddLineitem}
                    INVOICE = {this}
            />
              <div>
                {
                  this.state.invoiceInfo.lineitems.map(function(item,index){
                    return (
                        <Lineitem 
                        item = {item} 
                        index = {index}
                        changeLineitemPrice = {this.changeLineitemPrice}
                        changeLineitemQuantity = {this.changeLineitemQuantity}
                        invoice = {this}
                        />
                      )
                  }.bind(this))
                }
              </div>
              </div>
          <input 
            id = 'addInvoice'
            type="submit" 
            value="Save Invoice"
            onClick = {this.handleSubmit.bind(this)}
          />
        </form>
        <div>
        </div>
        <button id="exit" onClick = {this.handleShowDialog.bind(this)}>Exit</button>
      </dialog>
      <button id="show" onClick = {this.handleShowDialog.bind(this)}>Create Invoice</button>
    </div>     
    );
  }
}

export default Invoice;
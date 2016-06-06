import React, { Component } from 'react';
import Lineitem from './Lineitem';
import Search from './search';

class Invoice extends Component {

  constructor(props) {
    super(props);
    this.state = {
    name:'Hello!',
    
   
    }
    console.log('the beginning',this)
  }
  componentWillMount(){
    this.setState({
      invoiceInfo:{
        customerName:"",
        invoiceNumber:'',
        lineitems:[]
      },
      date:'2016-06-05'
    })

  }
  
  // getInitialState() {
  //   return {value: 'Hello!'};
  // }
  handleAddLineitem(index) {
    var array = Array.prototype.slice.call(arguments) 
    console.log('add arguments',arguments)
    array[1].preventDefault();
    console.log(this,'hi',this.props.INVOICE)
    var newLineitems = this.props.INVOICE.state.invoiceInfo.lineitems.concat(this.props.INVOICE.props.products[index])
    console.log('something weird is going on',newLineitems)
    this.props.INVOICE.setState({
      invoiceInfo:{
        customerName:this.props.INVOICE.state.invoiceInfo.customerName,
        invoiceNumber:this.props.INVOICE.state.invoiceInfo.invoiceNumber,
        lineitems:newLineitems
      }
    })
    console.log('after',this.props.INVOICE)
  }

  resetInvoiceState(){
    console.log('pjpj123',this)
    this.setState({
    // name:'Hello!',
    
   
    // invoiceInfo:{
    //   customerName:"",
    //   invoiceNumber:'',
    //   lineitems:[]
    //   },
    //   date:'2016-06-05'
   })
    console.log('pjpj1234',this)

  }
  componentDidMount(){
    console.log('PJPJPJP')
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

  handleSubmit(event) {
    console.log(event)
    event.preventDefault();

    console.log('submit',event)
    console.log('this',this)
    this.props.addInvoice.call(this.props.that,this.state.invoiceInfo,this.state.date)
    //this.resetInvoiceState()
  }
  handleShowDialog(event){
    event.preventDefault();
    this.setState({
      invoiceInfo:{
        customerName:"",
        invoiceNumber:'',
        lineitems:[]
      }
    })
    // var dialog = document.getElementById('window');
    // document.getElementById('show').onclick = function() {
    //     dialog.show();
    // };
  }

  handleSearchChange(event){
    this.setState({search: event.target.value});
  }
  handleInvoiceNumberChange(event){
    // this.setState({invoiceNumber: event.target.value});

    this.setState({
      invoiceInfo:{
        customerName:this.state.invoiceInfo.customerName,
        invoiceNumber:event.target.value,
        lineitems:this.state.invoiceInfo.lineitems
      }
    })
  }
  handleDateChange(event){
    console.log('dateChange',event.target.value)
    this.setState({date:event.target.value})
  }

  changeLineitemQuantity(quantity,index){
    console.log('cliq',this)
    console.log(arguments)
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

  changeLineitemPrice(price,index){
    console.log('clip',this)
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
    //var that = this;

    console.log('pj',this)
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
              <input
                type="text"
                value={this.props.value}
                lable = 'Name'
                onChange={this.handleSearchChange.bind(this)}
              />
              
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
            <button id="exit" onClick = {this.handleShowDialog.bind(this)}>Exit</button>
          </dialog>
          <button id="show" onClick = {this.handleShowDialog.bind(this)}>Create Invoice</button>
       </div>
        
    );
  }
}

export default Invoice;
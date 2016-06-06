import React, { Component } from 'react';
import Lineitem from './Lineitem';


//in this component i loop over all the invoices and add a button for them to be displayed
class SavedInvoice extends Component {
  
  //add event listeners to each invoice
  componentDidMount(){
      //console.log('PJPJPJP')
      var dialog = document.getElementById("invoice"+this.props.index);
      document.getElementById('show'+this.props.index).onclick = function() {
          dialog.show();
      };
       document.getElementById('exit'+this.props.index).onclick = function() {
          dialog.close();
      };
    }

  calculateItemTotal(quantity,price){
    return (Number(quantity)*Number(price)).toFixed(2)
  }

  handleShowDialog(event){
    event.preventDefault();
  }

  //loop through line items can calculate total cost on invoice
  calculateInvoiceTotal(){
    var total=0;
    for (var i = 0 ; i < this.props.invoice.lineitems.length; i++){
      total = total + Number(this.props.invoice.lineitems[i].price)*Number(this.props.invoice.lineitems[i].quantity)
    }
    return total.toFixed(2)
  }


  render() {
      //if i had more time i would have not used inline style so much
      return (
       <div>
            <dialog id={"invoice"+this.props.index} style = {{width:700}}>
             
          {'Customer Name: '}
          <span>
            {this.props.invoice.customerName}
          </span>
          <div>{'Date: '}
            <span>
              {this.props.invoice.date}
            </span>
          </div>
          <div>{'Invoice Number: '}
            <span>
              {this.props.invoice.invoiceNumber}
            </span>
          </div>
            <div>
                <h4>Line Items</h4>
                <div>
                  {
                    this.props.invoice.lineitems.map(function(item,index){
                      //console.log('item',item)
                      return (
                          <div>
                            <span style = 
                              {{
                                width:200,
                                display:'inline-block'
                              }}>
                              {item.productName}
                            </span> 
                            <span style = 
                              {{
                                width:150,
                                display:'inline-block'
                              }}>
                            {'Quantity: '+item.quantity}
                            </span>
                            <span style = 
                              {{
                                width:175,
                                display:'inline-block'
                              }}>
                            { 'unit price: $'+item.price.toFixed(2)}
                            </span>
                            <span style = {{float:'right'}}>
                              {' Total: $'+this.calculateItemTotal(item.quantity,item.price)}
                            </span>
                          </div>
                        )
                    }.bind(this))
                  }
                  <div></div>
                  <div style = {{float:'right', fontWeight:'bold',display:'block'}}>{'Total: $'}
                    {this.calculateInvoiceTotal.call(this)}
                  </div>
                </div>
              </div>
              <button id={"exit"+this.props.index} onClick = {this.handleShowDialog.bind(this)}>Exit</button>
            </dialog>
            <button id={"show"+this.props.index} onClick = {this.handleShowDialog.bind(this)}>invoice {this.props.index}</button>
         </div>
          
      );
    }
}

export default SavedInvoice;
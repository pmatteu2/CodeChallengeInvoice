import React, { Component } from 'react';
import Lineitem from './Lineitem';

class SavedInvoice extends Component {



  componentDidMount(){
      console.log('PJPJPJP')
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

  render() {
      //var that = this;

      console.log('pj',this)
      return (
       <div>
            <dialog id={"invoice"+this.props.index} style = {{width:700}}>
             
          Customer Name:
          <span>
            {this.props.invoice.customerName}
          </span>
          <div>Invoice Number:
          <span>
            {this.props.invoice.invoiceNumber}
          </span>
          </div>
            <div>
                <h3>Hello World!</h3>
                <div>
                  
                  {
                    this.props.invoice.lineitems.map(function(item,index){
                      console.log('item',item)
                      return (
                          <div>
                            {item.productName+ 'Quantity: '+item.quantity+' unit price: $'+item.price+' Total: $'+this.calculateItemTotal(item.quantity,item.price)}
                          </div>
                        )
                    }.bind(this))
                  }
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
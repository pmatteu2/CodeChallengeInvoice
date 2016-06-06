import React, { Component } from 'react';

import Invoice from 'components/Invoice/Invoice'
import SavedInvoice from 'components/Invoice/SavedInvoice';
import Data from './data'

class IndexComponent extends Component {
  //this component holds an array of invoices and 
  constructor(props) {
    super(props);
    this.state= {
      invoices: []
    }
  }

  //add invoice to state here
  addInvoice(invoice,date){
    //console.log('addInvoice this',this,'date',date)
    invoice.date = date;
    var newInvoices= this.state.invoices.concat(invoice)
    this.setState({
      invoices:newInvoices
    })
    //console.log('addedInvoice',this)
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    //grab all the data from data.js
    var data = Data.returnData();
    //console.log('index this',this)
    return (
      <section>
        <h2>Click to add Invoice</h2>
       <h4>(you will need to click exit or another action to leave each box you open)</h4>
       <div>also this app uses a new HTML5 element that i think is only works in chrome</div>
        <div></div>
        {this.state.invoices.map(function(invoice,index){
          return (
            <SavedInvoice 
            invoice = {invoice}
            index = {index}
            />
          )
        })
        
        }
        <div></div>
        <Invoice 
          products = {data} 
          addInvoice = {this.addInvoice}
          that = {this}
        />
      </section>

    );
  }
}

IndexComponent.defaultProps = {
  items: []
};

export default IndexComponent;

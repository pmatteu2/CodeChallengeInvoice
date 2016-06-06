import React, { Component } from 'react';

import Invoice from 'components/Invoice/Invoice'
import SavedInvoice from 'components/Invoice/SavedInvoice';

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      invoices: []
    }
  }

  addInvoice(invoice,date){
    console.log('addInvoice this',this,'date',date)
    invoice.date = date;
    var newInvoices= this.state.invoices.concat(invoice)
    this.setState({
      invoices:newInvoices
      })
    console.log('addedInvoice',this)
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <p ref="empty">Index is empty.</p>
      );
    }

    var data = [
      {
        productName:'notebook',
        defaultPrice:1
      },
      {
        productName:'car',
        defaultPrice:20000
      },
       {
        productName:'computer',
        defaultPrice:800
      },
       {
        productName:'toy',
        defaultPrice:3.50
      },
       {
        productName:'computer mouse pad',
        defaultPrice:35
      },
       {
        productName:'notepad',
        defaultPrice:3
      },
       {
        productName:'bookbag',
        defaultPrice:30
      },
       {
        productName:'computer mouse',
        defaultPrice:3
      },
       {
        productName:'toy mouse',
        defaultPrice:3
      },
       {
        productName:'toy car',
        defaultPrice:3
      },
       {
        productName:'computer keybourd',
        defaultPrice:39
      }
    ]


    console.log('index this',this)

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

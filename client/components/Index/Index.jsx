import React, { Component } from 'react';
import Checkbox from 'components/Checkbox/CheckboxWithLabel';
import Invoice from 'components/Invoice/Invoice'
import SavedInvoice from 'components/Invoice/SavedInvoice';

class IndexComponent extends Component {
  constructor(props) {
    super(props);
    this.state= {
      invoices: []
    }
  }

  addInvoice(invoice){
    console.log('addInvoice this',this)
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
        productName:'item1',
        defaultPrice:1
      },
      {
        productName:'item2',
        defaultPrice:2
      },
       {
        productName:'item3',
        defaultPrice:3
      }
    ]


    console.log('index this',this)

    return (
      <section>
        <h2>react-webpack-boilerplate</h2>
        <ul ref="indexList" className="index-list">
          {this.props.items.map((item, index) => {
            return (<li key={index}>item {item}</li>);
          })}
        </ul>
        <Checkbox />
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

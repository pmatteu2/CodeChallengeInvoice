import React, { Component } from 'react';

//search starts off by displaying all of the products and then if something is typed in the search field only matching products will display
class Search extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
    	search:'',
    }
  }

  //add event listeners after render
  componentDidMount(){
    //console.log('PJPJPJP')
    var dialog = document.getElementById('search');
    document.getElementById('showSearch').onclick = function() {
        dialog.show();
    };
     document.getElementById('exitSearch').onclick = function() {
     	//console.log('hmm')
        dialog.close();
    };
    var addItemButtons = document.getElementsByClassName('addItem')
    for (var i = 0 ; i < addItemButtons.length ; i++){
	    addItemButtons[i].onclick = function() {
	        dialog.close();
	    };
	}
  }

   handleSearchChange(event){
    this.setState({search: event.target.value});
  }

  //if productname does not contain search value, hide, also show if search is empty
  productDisplay(productName){
  	if (productName.indexOf(this.state.search)!==-1 || this.state.search === ''){
  		//console.log('happening?')
  		return {}
  	}
  	else{
  		return {display:'none'}
  	}

  }
  handleShowSearch(event){
    event.preventDefault();
  }

  render(){
  	//console.log('test1',this)
  	return (
  		<div>
  		  <dialog id="search" style = {{width:700}}>
          <h3>Search</h3>
          <div>
            <input
              type="text"
              value={this.props.value}
              lable = 'Name'
              onChange={this.handleSearchChange.bind(this)}
              placeholder = {'Enter product name'}
            />
            {
              this.props.products.map(function(item,index){
              	//console.log('test2',this)
                return (
                    <div style = {this.productDisplay(item.productName)}>{item.productName}
                    	<button 
                    		type = 'button'
                    		className='addItem' 
                    		onClick = {this.props.handleAddLineitem.bind(this.props.INVOICE,index)} 
                    		value = 'Add Item'
                    		>addItem
                    		</button>
                    </div>
                  )
              }.bind(this))
            }
          </div>
          <div></div>
          <button id="exitSearch" onClick = {this.handleShowSearch.bind(this)}>Exit</button>
        </dialog>
        <button id="showSearch" onClick = {this.handleShowSearch.bind(this)}>Add Lineitem</button>
  		</div>
  	)
  }
}

export default Search;
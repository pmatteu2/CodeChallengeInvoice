import React, { Component } from 'react';


class Search extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
    	search:'',
	}
  }

  componentDidMount(){
    console.log('PJPJPJP')
    var dialog = document.getElementById('search');
    document.getElementById('showSearch').onclick = function() {
        dialog.show();
    };
     document.getElementById('exitSearch').onclick = function() {
     	console.log('hmm')
        dialog.close();
    };
    var addItemButtons = document.getElementsByClassName('addItem')
    for (var i = 0 ; i < addItemButtons.length ; i++){
	    addItemButtons[i].onclick = function() {
	    	console.log('so sad')
	        dialog.close();
	    };
	}
  }

   handleSearchChange(event){
    this.setState({search: event.target.value});
  }

  productDisplay(productName){
  	if (productName.indexOf(this.state.search)!==-1 || this.state.search === ''){
  		console.log('happening?')
  		return {}
  	}
  	else{
  		console.log('opps')
  		return {display:'none'}
  	}

  }
  handleShowSearch(event){
    event.preventDefault();
    // var dialog = document.getElementById('window');
    // document.getElementById('show').onclick = function() {
    //     dialog.show();
    // };
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
                      		onClick = {this.props.handleAddLineitem.bind(this,index)} 
                      		value = 'Add Item'
                      		>addItem
                      		</button>
                      </div>
                    )
                }.bind(this))
              }
            </div>
            <button id="exitSearch" onClick = {this.handleShowSearch.bind(this)}>Exit</button>
          </dialog>
          <button id="showSearch" onClick = {this.handleShowSearch.bind(this)}>Add Lineitem</button>
  		</div>
  	)
  }


}

export default Search;
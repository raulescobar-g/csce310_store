import React from 'react'
import DiscountList from './DiscountList'
import './Discounts.css'
import _ from 'lodash';
import CreateDiscount from './CreateDiscount';

// Example data from API call
// const discounts = [
//   {
//     code: 'make React discount list',
//     percent: '15%',
//     isCompleted: true
//   }, {
//     code: 'click on item to complete',
//     percent: '95%',
//     isCompleted: false
//   },{
//     code: 'style discount list',
//     percent: '16%',
//     isCompleted: true
//   }
// ];

export default class Discounts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // discounts
      discounts: []
    };
    
    fetch('http://localhost:5000/discounts/getdiscounts/')
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        discounts: data})
        console.log(data)
      });
  }

  render() {
    return (
      <div className="container discountsContainer">
          <div className="">
            {/* <Header /> */}
            <CreateDiscount discounts={this.state.discounts} createCode={this.createCode.bind(this)}/>
            {/* <Filter /> */}
            <DiscountList discounts={this.state.discounts} toggleCode={this.toggleCode.bind(this)} saveCode={this.saveCode.bind(this)} deleteCode={this.deleteCode.bind(this)}/>
            {/* <Footer /> */}
          </div>
      </div>
    )
  }

  toggleCode(code) {
    const foundDiscount = _.find(this.state.discounts, discount => discount.code === code);
    foundDiscount.isCompleted = !foundDiscount.isCompleted;
    this.setState({discounts: this.state.discounts});
  }

  createCode(code, percent) {
    this.state.discounts.push({code, percent, isCompleted: false});
    this.setState({discounts: this.state.discounts});
    const data = {code: code,
                  percent: percent}
    fetch("http://localhost:5000/discounts/", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    })
    .catch(res=>{
    console.log("Exception : ",res);
    })
  }

  saveCode(id, newCode, newPercent) {
    const foundDiscount = _.find(this.state.discounts, discount => discount.discountid === id);
    foundDiscount.code = newCode;
    foundDiscount.percent = newPercent;
    this.setState({discounts: this.state.discounts});

    fetch("http://localhost:5000/discounts/update/" + id, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        code : newCode,
        percent : newPercent
        })
    })
  }

  deleteCode(codeId) {
    _.remove(this.state.discounts, discount => discount.discountid === codeId);
    this.setState({discounts: this.state.discounts});
    console.log(codeId)
    fetch('http://localhost:5000/discounts/delete/' + codeId,
    { method: 'DELETE' })
    .then(response => response.json())
  }

}

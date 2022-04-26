import React from 'react';
import _ from 'lodash';
import DiscountHeader from './DiscountHeader'
import DiscountListItem from './DiscountListItem'

export default class DiscountList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'discounts');

    return _.map(this.props.discounts, (discount, index) => <DiscountListItem key={index} {...discount} {...props}/>);
  }

  render() {
    return (
      <table className="table">
        <DiscountHeader/>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}
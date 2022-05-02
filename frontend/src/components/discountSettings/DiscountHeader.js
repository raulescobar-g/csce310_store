// Written by David Hung
import React from 'react';

export default class DiscountHeader extends React.Component {
  render(){
    return (
        <thead>
          <tr>
            <th>Codes</th>
            <th>Percent</th>
            <th className="right">Actions</th>
          </tr>
        </thead>
    )
  }
}
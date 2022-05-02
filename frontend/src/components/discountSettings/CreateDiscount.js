// Written by David Hung
import React from 'react';
import _ from 'lodash';

export default class CreateDiscount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }

    return <div style={{
      color: 'red'
    }}>{this.state.error}</div>;
  }

  render() {
    return (

      <form className="todoInput" >
        <div className="input-group">
            <input className="form-control form-control2" type="text" placeholder="Create Code" ref="createCode"/>
            <input className="form-control form-control2" type="text" placeholder="Percent Off" ref="createPercent"/>
            <div className="input-group-btn">
              <h1 className="btn btn-default addBtn2" onClick={this.handleCreate.bind(this)}>
                <i className="fa fa-plus" aria-hidden="true">+</i>
              </h1>
            </div>
        </div>
        <div className="errorMsg">
          {this.renderError()}
        </div>
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const createCode = this.refs.createCode;
    const createPercent = this.refs.createPercent;
    const code = createCode.value;
    const percent = createPercent.value;
    const validateInput = this.validateInput(code);

    if (validateInput) {
      this.setState({error: validateInput});
      return;
    }

    this.setState({error: null});
    this.props.createCode(code, percent);
    this.refs.createCode.value = '';
    this.refs.createPercent.value = '';
  }

  validateInput(code) {
    if (!code) {
      return 'Please enter a discount code.';
    } else if (_.find(this.props.discounts, todo => todo.code === code)) {
      return 'Discount code already exists.';
    } else {
      return null;
    }
  }
}
// Written by David Hung
import React from 'react';

export default class DiscountListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  renderCodeSection() {
    const {code, percent, isCompleted} = this.props;
    const codeStyle =  isCompleted ? 'done' : ''

    if (this.state.isEditing) {
      return (
        <>
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input className="form-control" type="text" defaultValue={code} ref="editInput"/>
          </form>
        </td>
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input className="form-control" type="text" defaultValue={percent} ref="editInput2"/>
          </form>
        </td>
        </>
      );
    }
    return (
      <>
      <td className={codeStyle} onClick={this.props.toggleCode.bind(this, code)}>
        {code}
      </td>
      <td className={codeStyle} onClick={this.props.toggleCode.bind(this, code)}>
        {percent}
      </td>
      </>
    );
  }
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <h1 className="pull-right btn btn-sm btn-info" onClick={this.onSaveClick.bind(this)}>Save</h1>
            <h1 className="pull-right btn btn-sm btn-default" onClick={this.onCancelClick.bind(this)}>Cancel</h1>
          </div>
        </td>
      );
    }

    return (
      <td>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <h1 className="pull-right btn btn-sm btn-default" onClick={this.onEditClick.bind(this)}>Edit</h1>
          <h1 className="pull-right btn btn-sm btn-default" onClick={this.props.deleteCode.bind(this, this.props.discountid)}>Delete</h1>
        </div>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderCodeSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }

  onEditClick() {
    this.setState({isEditing: true});
  }

  onCancelClick() {
    this.setState({isEditing: false});
  }

  onSaveClick(event) {
    event.preventDefault();
    const id = this.props.discountid
    const newCode = this.refs.editInput.value;
    const newPercent = this.refs.editInput2.value;
    this.props.saveCode(id, newCode, newPercent);
    this.setState({isEditing: false});
  }
}
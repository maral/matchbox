import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export class YesNoAlert extends Component {
  reject = () => {
    this.props.onClose();
    if ('onReject' in this.props) {
      this.props.onReject();
    }
  }

  confirm = () => {
    this.props.onClose();
    if ('onConfirm' in this.props) {
      this.props.onConfirm();
    }
  }

  showProgress = () => {
    this.props.onClose();
    if ('onShowProgress' in this.props) {
      this.props.onShowProgress();
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
        {this.props.isOpen && (
          <Alert key="1" className="fixed" color="success">
            {this.props.message}
            <Button color="primary" onClick={this.confirm}>Ano</Button>
            <Button onClick={this.reject}>Ne</Button>
            <Button color="info" onClick={this.showProgress}>Zobrazit postup</Button>
          </Alert>
        )}
      </ReactCSSTransitionGroup>
    );
  }
}

YesNoAlert.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  onReject: React.PropTypes.func,
  onConfirm: React.PropTypes.func,
  isOpen: React.PropTypes.bool,
  message: React.PropTypes.string.isRequired,
};
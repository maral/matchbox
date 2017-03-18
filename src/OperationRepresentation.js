import React, { Component } from 'react';
import { Matchbox, Matches } from './Matchbox';
import { DivideOperator, PlusOperator, MinusOperator, Constant } from './Operators';

class OperationRepresentation extends Component {
  createOperator = (operator) => {
    switch (operator) {
      case '/':
        return <DivideOperator />;
      case '-':
        return <MinusOperator />;
      default:
        return <PlusOperator />;
    }
  }

  createObject = (operation) => {
    if (operation.operator === '/') {
      return <Constant value={operation.number} />;
    } else {
      switch (operation.item) {
        case 'b':
          return <Matchbox count={operation.number} value={0} isOpen={false}  mode={this.props.mode} />;
        default:
          return <Matches count={operation.number} mode={this.props.mode} />;
      }
    }
  }

  render() {
    let op = this.props.operation;
    return (
      <div className="EquationRepresentation">
        {this.createOperator(op.operator)}
        {this.createObject(op)}
      </div>
    );
  }
}

export default OperationRepresentation;
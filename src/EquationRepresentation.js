import React, { Component } from 'react';
import { Matchbox, Matches } from './Matchbox';
import { EqualsOperator, PlusOperator, MinusOperator } from './Operators';

class EquationRepresentation extends Component {
  createObject = (token, key) => {
    switch (token) {
      case '=':
        return <EqualsOperator key={key} />;
      case '-':
        return <MinusOperator key={key} />;
      case '+':
        return <PlusOperator key={key} />;
      default:
        if (token.type === 'x') {
          return <Matchbox key={key} count={token.value} value={this.props.equation.getSolution()}
            isOpen={this.props.isSolved}  mode={this.props.mode} />;
        } else {
          return <Matches key={key} count={token.value} mode={this.props.mode} />;
        }
    }
  }

  render() {
    return (
      <div className="EquationRepresentation">
        {this.props.equation.getObjects().map((item, i) => 
          this.createObject(item, i)
        )}
      </div>
    );
  }
}

export default EquationRepresentation;
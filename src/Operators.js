import React from 'react';

function Operator(props) {
  return <div className="Operator">{props.value}</div>;
}

export function PlusOperator(props) {
  return <Operator value="+" />;
}

export function MinusOperator(props) {
  return <Operator value="-" />;
}

export function EqualsOperator(props) {
  return <Operator value="=" />;
}
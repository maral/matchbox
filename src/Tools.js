import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Radio } from './Options';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operator: "-",
      item: "m",
      number: 1,
    }
  }

  changeOperator = (operator) => {
    this.setState({
      operator: operator,
    });
  }

  changeItem = (item) => {
    this.setState({
      item: item,
    });
  }

  changeNumber = (number) => {
    this.setState({
      number: number,
    });
  }

  execute = () => {
    this.props.onOperation({
      operator: this.state.operator,
      item: this.state.item,
      number: this.state.number
    });
  }

  render() {
    return (
      <Row className="Tools">
        <Col xs="12">
          <hr />
          <h4>Operace</h4>
        </Col>

        <Col md="4" xs="12">
          <Radio vertical size="lg" options={[
            { text: "-", value: "-" },
            { text: "+", value: "+" },
            { text: "÷", value: "/" },
          ]} onChange={this.changeOperator} value={this.state.operator} />

          {this.state.operator !== "/" && (
            <Radio vertical options={[
              { text: this.props.mode === "m" ? "Sirky" : "Čísla", value: "m" },
              { text: this.props.mode === "m" ? "Krabičky" : "x", value: "b" },
            ]} onChange={this.changeItem} value={this.state.item} />
          )}
        </Col>

        <Col md="4" xs="12">
          <Row className="justify-content-center">
            {[...Array(16)].map((x, i) =>
              <Col key={i} xs="auto">
                <NumberButton selected={this.state.number} value={i + 1} onSelect={this.changeNumber} />
              </Col>
            )}
          </Row>
        </Col>

        <Col md="4" xs="12">
          <Button color="success" onClick={this.execute}>
            Provést
          </Button>
        </Col>
      </Row>
    );
  }
}

class NumberButton extends Component {
  select = () => {
    this.props.onSelect(this.props.value);
  }

  render() {
    return (
      <Button color={this.props.value === this.props.selected ? "primary" : "secondary"}
        className="Answer" size="lg" onClick={this.select}>
        {this.props.value}
      </Button>
    );
  }
}

export default Tools;
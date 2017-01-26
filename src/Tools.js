import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Radio } from './Options';

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operation: "-",
      item: "m",
      number: 1,
    }
  }

  changeOperation = (operation) => {
    this.setState({
      operation: operation,
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
    this.props.onOperation(this.state.operation, this.state.item, this.state.number);
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
          ]} onChange={this.changeOperation} value={this.state.operation} />

          {this.state.operation !== "/" && (
            <Radio vertical options={[
              { text: this.props.mode === "m" ? "Sirky" : "Čísla", value: "m" },
              { text: this.props.mode === "m" ? "Krabičky" : "x", value: "b" },
            ]} onChange={this.changeItem} value={this.state.item} />
          )}
        </Col>

        <Col md="4" xs="12">
          {[...Array(3)].map((x, i) =>
            <div key={i}>
              {[...Array(5)].map((y, j) =>
                <NumberButton selected={this.state.number} value={i * 5 + j + 1} onSelect={this.changeNumber}
                  key={i * 5 + j} />
              )}
            </div>
          )}
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
import React, { Component } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';

class Options extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col sm="3" xs="12">
            <Radio title="Obtížnost" options={[
              { text: "1", value: 1 },
              { text: "2", value: 2 },
              { text: "3", value: 3 },
            ]} onChange={this.props.changeLevel} value={this.props.level} />
          </Col>

          <Col sm="3" xs="12">
            <Radio title="Zobrazení" options={[
              { text: "Sirky", value: "m" },
              { text: "Čísla", value: "n" },
            ]} onChange={this.props.changeMode} value={this.props.mode} />
          </Col>

          <Col sm="3" xs="12">
            <Radio title="Nástroje" options={[
              { text: "Zobrazit", value: true },
              { text: "Skrýt", value: false },
            ]} onChange={this.props.changeShowTools} value={this.props.showTools} />
          </Col>

          <Col sm="3" xs="12">
            <h5>&nbsp;</h5>
            <Button color="success" onClick={this.props.newEquation}>
              Nová rovnice
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Options;

export function Radio(props) {
  return (
    <div className="Radio">
      <h5>{props.title}</h5>
      <ButtonGroup vertical={props.vertical}>
        {props.options.map((option, i) => 
          <RadioButton key={i} text={option.text} value={option.value} size={props.size}
            selected={props.value === option.value} onChange={props.onChange} />
        )}
      </ButtonGroup>
    </div>
  );
}

class RadioButton extends Component {
  change = () => {
    this.props.onChange(this.props.value);
  }

  render() {
    return (
      <Button onClick={this.change} color={this.props.selected ? "primary" : "secondary"}
        size={this.props.size}>
        {this.props.text}
      </Button>
    );
  }
}
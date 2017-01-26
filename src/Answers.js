import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';

export function AnswerBox(props) {
  return (
    <div>
      <div className="Question">
        {props.mode === "m" ? "Kolik sirek je v krabičce?" : 
          <div>Jakou hodnotu má <strong>x</strong>?</div>}
      </div>
      <Row className="Answers justify-content-center">
        {[...Array(16)].map((x, i) =>
          <Col xs="auto" key={i}>
            <Answer value={i} isCorrect={i === props.result}
              isSolved={props.isSolved} doAnswer={props.doAnswer} />
          </Col>
        )}
      </Row>
    </div>
  );
}

class Answer extends Component {
  constructor(props, state) {
    super(props);
    this.state = {
      isClicked: false,
    };
  }

  reveal = () => {
    this.setState(() => ({
      isClicked: true,
    }));
    this.props.doAnswer(this.props.isCorrect);
  }

  render() {
    let color = this.state.isClicked ? (this.props.isCorrect ? "success" : "danger") : "default";

    return (
      <Button className="Answer" size="lg" color={color}
        onClick={this.props.isSolved ? null : this.reveal}>
        {this.props.value}
      </Button>
    );
  }
}
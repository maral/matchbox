import React, { Component } from 'react';
import { Button } from 'reactstrap';

export function AnswerBox(props) {
  return (
    <div>
      <div className="Question">
        {props.mode === "m" ? "Kolik sirek je v krabičce?" : 
          <div>Jakou hodnotu má <strong>x</strong>?</div>}
      </div>
      <div className="Answers">
        {[...Array(3)].map((x, i) =>
          <div key={i}>
            {[...Array(5)].map((y, j) =>
              <Answer key={j} value={i*5 + j} isCorrect={i*5 + j === props.result}
                isSolved={props.isSolved} doAnswer={props.doAnswer} />
            )}
          </div>
        )}
      </div>
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
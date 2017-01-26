import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col, Collapse } from 'reactstrap';
import { AnswerBox } from './Answers';
import AppHeader from './AppHeader';
import Options from './Options';
import Tools from './Tools';
import Equation from './Equation';
import { YesNoAlert } from './Alert';
import EquationRepresentation from './EquationRepresentation';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let level = 1;
    this.state = {
      isSolved: false,
      level: level,
      showTools: false,
      mode: "m",
      equation: new Equation({level: level}),
      counter: 0,
      alertClosed: false,
      progress: [],
      showProgress: false,
    };
  }

  /* functions to be passed to child components */
  changeShowTools = (showTools) => {
    this.setState({
      showTools: showTools
    });
  }

  changeMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  newEquation = (level) => {
    this.setState((prevState) => {
      let newLevel = [1, 2, 3].includes(level) ? level : prevState.level;
      return {
        isSolved: false,
        equation: new Equation({level: newLevel}),
        counter: prevState.counter + 1,
        alertClosed: false,
        level: newLevel,
        progress: [],
        showProgress: false,
      }
    });
  }

  showProgress = () => {
    this.setState({
      showProgress: true,
    });
  }

  closeAlert = () => {
    this.setState({ alertClosed: true });
  }

  doAnswer = (isCorrect) => {
    if (this.state.isSolved) {
      return;
    }
    this.setState({
      isSolved: isCorrect
    });
  }

  onOperation = (operation, item, number) => {
    if (this.state.isSolved) {
      return;
    }
    let eq = this.state.equation.performOperation(operation, item, number);
    if (eq !== false) {
      this.setState((prevState) => {
        return {
          equation: eq,
          progress: [...prevState.progress, prevState.equation],
        };
      });
    }
  }

  /* helper render methods */
  getEquation = () => {
    return <EquationRepresentation mode={this.state.mode} equation={this.state.equation}
                isSolved={this.state.isSolved} />;
  }

  getAnswerBox = () => {
    return <AnswerBox result={this.state.equation.getSolution()} doAnswer={this.doAnswer}
                isSolved={this.state.isSolved} mode={this.state.mode} key={this.state.counter} />;
  }

  getTools = () => {
    return <Tools mode={this.state.mode} onOperation={this.onOperation}/>;
  }

  getEquationAndAnswerBox = (cols) => {
    return (
      <Col md={cols} sm="12">
        <Row>
          <Col>
            {this.getEquation()}
          </Col>
        </Row>

        <Row>
          <Col>
            {this.getAnswerBox()}
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    return (
      <div className="App">
        <AppHeader/>

        <Jumbotron>
          <Options level={this.state.level} changeLevel={this.newEquation}
            mode={this.state.mode} changeMode={this.changeMode}
            showTools={this.state.showTools} changeShowTools={this.changeShowTools}
            newEquation={this.newEquation} />
        </Jumbotron>

        <Container>
          <Collapse isOpen={this.state.showProgress}>
            <h4>Postup</h4>
            {this.state.progress.map((equation, i) => (
              <Row key={i}>
                <Col>
                  <EquationRepresentation mode={this.state.mode} equation={equation}
                    isSolved={false} />
                  <hr />
                </Col>
              </Row>
            ))}

            <Row>
              <Col>
                <EquationRepresentation mode={this.state.mode} equation={this.state.equation}
                  isSolved={true} />
              </Col>
            </Row>
            <hr />
          </Collapse>
        </Container>
        
        <Container>
          <Row>
            <Col md="8" xs="12">
              {this.getEquation()}
            </Col>

            <Col md="4" xs="12">
              {this.getAnswerBox()}
            </Col>
          </Row>

          {this.state.showTools && (
            <Row>
              <Col>
                {this.getTools()}
              </Col>
            </Row>
          )}
        </Container>
        <YesNoAlert message="Výborně! Přejete si novou rovnici?" onClose={this.closeAlert}
          isOpen={this.state.isSolved && !this.state.alertClosed} onConfirm={this.newEquation}
          onShowProgress={this.showProgress} />
      </div>
    );
  }
}

export default App;

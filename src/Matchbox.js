import React, { Component } from 'react';
import matchboxPicture from './img/matchbox.png';
import matchPicture from './img/match.png';

const rowMatchCount = 7;
const maxMatchCount = 2 * rowMatchCount;

class Matchbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  toggleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    let open = this.state.isOpen ? 'open' : '';
    let cssClasses = `Matchbox ${open}`;

    return (
      <div className={cssClasses}>
        <img src={matchboxPicture} onClick={this.toggleOpen} alt="Matchbox" className="Front" />
        {this.props.value > 0 && <MatchWrapper count={this.props.value} />}
        <MatchboxInside />
      </div>
    );
  }
}

function MatchboxInside(props) {
  return <div className="Inside"/>;
}

function MatchWrapper(props) {
  // maximum number of maxMatchCount (14) matches, trim others
  let count = Math.min(props.count, maxMatchCount);
  return (
    <div className="MatchWrapper">
      {/* maximum rowMatchCount (7) matches into the first row */}
      {[...Array(Math.min(count, rowMatchCount))].map((x, i) =>
        <Match key={i + 1} />
      )}
      {count > rowMatchCount && 
        <div>
          {[...Array(count - rowMatchCount)].map((x, i) =>
            <Match key={i + 1} />
          )}
        </div>
      }
    </div>
  );
}


export function Match(props) {
  return <img src={matchPicture} alt="Match" className="Match" />;
}

export default Matchbox;

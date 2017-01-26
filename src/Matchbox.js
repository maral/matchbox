import React from 'react';
import matchboxPicture from './img/matchbox.png';
import matchPicture from './img/match.png';

export function Matchbox(props) {
  if (props.mode === "m") {
    let open = props.isOpen ? 'open' : '';
    let cssClasses = `Matchbox ${open}`;

    return (
      <div className={cssClasses} style={{marginRight: 6 * (props.count - 1) + 'px'}}>
        {[...Array(props.count)].map((x, i) =>
          <img key={i} src={matchboxPicture} alt="Matchbox" className="Front"
            style={{marginTop: i * 8 + 'px', marginLeft: i * 6 + 'px'}} />
        )}
        {props.value > 0 && <MatchWrapper count={props.value} />}
        <MatchboxInside />
        <Description count={props.count} type="b"/>
      </div>
    );
  } else {
    return <Number value={(props.count !== 1 ? props.count : "") + "x"} />;
  }
}

export function Matches(props) {
  if (props.mode === "m") {
    return (
      <div className="Matches">
        <Description type="m" count={props.count} />
        <MatchWrapper count={props.count} rowCount={14} />
      </div>
    );
  } else {
    return <Number value={props.count} />;
  }
}

function Description(props) {
  let noun = "";
  if (props.count === 1) {
    if (props.type === "b") { // box
      noun = "krabička";
    } else {
      noun = "sirka";
    }
  } else if (props.count >= 2 && props.count <= 4) {
    if (props.type === "b") { // box
      noun = "krabičky";
    } else {
      noun = "sirky";
    }
  } else {
    if (props.type === "b") { // box
      noun = "krabiček";
    } else {
      noun = "sirek";
    }
  }

  return <div className="Description">{props.count} {noun}</div>;
}

function MatchboxInside(props) {
  return <div className="Inside"/>;
}

const rowMatchCount = 7;

function MatchWrapper(props) {
  let rowCount = 'rowCount' in props ? props.rowCount : rowMatchCount;
  // maximum number of matches, trim others
  let count = Math.min(props.count, rowCount * 2);
  let half = props.count > rowMatchCount ? Math.ceil(props.count / 2) : rowCount;
  return (
    <div className="MatchWrapper">
      {/* maximum rowMatchCount (7) matches into the first row */}
      {[...Array(Math.min(count, half))].map((x, i) =>
        <Match key={i + 1} />
      )}
      {count > half && 
        <div>
          {[...Array(count - half)].map((x, i) =>
            <Match key={i + 1} />
          )}
        </div>
      }
    </div>
  );
}


function Match(props) {
  return <img src={matchPicture} alt="Match" className="Match" />;
}

function Number(props) {
  return <div className="Number">{props.value}</div>;
}
import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  show: React.PropTypes.bool,
  rectCount: React.PropTypes.number,
};

const defaultProps = {
  show: false,
  rectCount: 5,
};

class TodoSpinner extends React.Component {

  render() {
    let rects = [];

    for (let i = 0; i < this.props.rectCount; i++) {
      rects.push(<i key={i} className="rect" />);
    }

    return (
      <ul className="list-movie">
        <li>
          <div className="spinner">
            {rects}
          </div>
        </li>
      </ul>
    );
  }

}

TodoSpinner.propTypes = propTypes;
TodoSpinner.defaultProps = defaultProps;

export default TodoSpinner;

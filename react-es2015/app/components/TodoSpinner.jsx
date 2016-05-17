import React, { PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  rectCount: PropTypes.number,
};

const defaultProps = {
  show: false,
  rectCount: 5,
};

function TodoSpinner(props) {
  let rects = [];

  for (let i = 0; i < props.rectCount; i++) {
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

TodoSpinner.propTypes = propTypes;
TodoSpinner.defaultProps = defaultProps;

export default TodoSpinner;

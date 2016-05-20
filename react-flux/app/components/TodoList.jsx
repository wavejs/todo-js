import React, { PropTypes } from 'react';

const propTypes = {
  list: PropTypes.array.isRequired,
};

const defaultProps = {
  list: [],
  api: {
    key: 'da64071f',
    uri: 'http://img.omdbapi.com/',
  },
};

function TodoList(props) {
  const API_URI = props.api.uri;
  const API_KEY = props.api.key;

  return (
    <ul className="list-movie">
      {props.list.map(function (item, key) {
        const imgSrc = API_URI + '?i=' + item.imdbID + '&apikey=' + API_KEY;

        return (
          <li key={key}>
            <div className="thumb">
              <img src={imgSrc} alt={item.Title} />
            </div>
            <div className="info">
              <div className="title">{item.Title}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;

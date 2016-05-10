import React from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  list: React.PropTypes.array.isRequired,
};

const defaultProps = {
  list: [],
  api: {
    key: 'da64071f',
    uri: 'http://img.omdbapi.com/',
  },
};

class TodoList extends React.Component {

  render() {
    const API_URI = this.props.api.uri;
    const API_KEY = this.props.api.key;

    return (
      <ul className="list-movie">
      {this.props.list.map((item, key) => {
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

}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;

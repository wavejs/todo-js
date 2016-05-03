'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired
  },

  getDefaultProps: function () {
    return {
      list: [],
      api: {
        key: 'da64071f',
        uri: 'http://img.omdbapi.com/'
      }
    };
  },

  render: function () {
    var API_KEY = this.props.api.key;
    var API_URI = this.props.api.uri;

    return (
      <ul className="list-movie">
        {this.props.list.map(function (item, key) {
          var imgSrc = API_URI + '?i=' + item.imdbID + '&apikey=' + API_KEY;

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
        }.bind(this))}
      </ul>
    );
  }

});

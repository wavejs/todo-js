'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TodoHeader = require('./TodoHeader');
var TodoMain = require('./TodoMain');

var TodoApp = React.createClass({

  getInitialState: function () {
    return {
      list: [],
      spinner: {
        show: false,
        rectCount: 5
      }
    };
  },

  changeSearchResult: function (obj) {
    this.setState({
      list: obj.list,
      spinner: {
        show: obj.spinner.show,
        rectCount: obj.spinner.rectCount
      }
    });
  },

  render: function () {
    return (
      <div>
        <TodoHeader changeSearchResult={this.changeSearchResult} />
        <TodoMain list={this.state.list} spinner={this.state.spinner} />
      </div>
    );
  }

});

ReactDOM.render(<TodoApp />, document.getElementById('rc-app'));

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TodoSpinner = require('./TodoSpinner');
var TodoList = require('./TodoList');

module.exports = React.createClass({

  propTypes: {
    list: React.PropTypes.array.isRequired,
    spinner: React.PropTypes.shape({
      show: React.PropTypes.bool,
      rectCount: React.PropTypes.number
    })
  },

  render: function () {
    var main;

    if (this.props.spinner && this.props.spinner.show) {
      main = (
        <TodoSpinner show={this.props.spinner.show} rectCount={this.props.spinner.rectCount} />
      );
    } else {
      main = (
        <TodoList list={this.props.list} />
      );
    }

    return (
      <section className="todo-main">
        {main}
      </section>
    );
  }

});

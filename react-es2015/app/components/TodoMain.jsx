import React from 'react';
import ReactDOM from 'react-dom';
import TodoSpinner from './TodoSpinner';
import TodoList from './TodoList';

const propTypes = {
  list: React.PropTypes.array.isRequired,
  spinner: React.PropTypes.shape({
    show: React.PropTypes.bool,
    rectCount: React.PropTypes.number,
  }),
};

class TodoMain extends React.Component {

  constructor() {
    super();
  }

  render() {
    let main;

    if (this.props.spinner && this.props.spinner.show) {
      main = (
        <TodoSpinner
          show={this.props.spinner.show}
          rectCount={this.props.spinner.rectCount}
        />
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

}

TodoMain.propTypes = propTypes;

export default TodoMain;

import React, { PropTypes } from 'react';
import TodoSpinner from './TodoSpinner';
import TodoList from './TodoList';

const propTypes = {
  list: PropTypes.array.isRequired,
  spinner: PropTypes.shape({
    show: PropTypes.bool,
    rectCount: PropTypes.number,
  }),
};

function TodoMain(props) {
  let main;

  if (props.spinner && props.spinner.show) {
    main = (
      <TodoSpinner
        show={props.spinner.show}
        rectCount={props.spinner.rectCount}
      />
    );
  } else {
    main = <TodoList list={props.list} />;
  }

  return (
    <section className="todo-main">
      {main}
    </section>
  );
}

TodoMain.propTypes = propTypes;

export default TodoMain;

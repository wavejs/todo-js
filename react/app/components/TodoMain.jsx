window.app = (function (app) {

  'use strict';

  app.TodoMain = React.createClass({

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
          <app.TodoSpinner show={this.props.spinner.show} rectCount={this.props.spinner.rectCount} />
        );
      } else {
        main = (
          <app.TodoList list={this.props.list} />
        );
      }

      return (
        <section className="todo-main">
          {main}
        </section>
      );
    }

  });

  return app;

}(window.app || {}));

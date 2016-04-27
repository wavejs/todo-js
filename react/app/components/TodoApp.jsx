window.app = (function (app) {

  'use strict';

  app.TodoApp = React.createClass({

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
          <app.TodoHeader changeSearchResult={this.changeSearchResult} />
          <app.TodoMain list={this.state.list} spinner={this.state.spinner} />
        </div>
      );
    }

  });

  ReactDOM.render(<app.TodoApp />, document.getElementById('rc-app'));

}(window.app || {}));

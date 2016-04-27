window.app = (function (app) {

  'use strict';

  var KEYS = {
    ENTER: 13
  };

  app.TodoHeader = React.createClass({

    getDefaultProps: function () {
      return {
        api: {
          uri: 'http://www.omdbapi.com/'
        },
        changeSearchResult: function () {}
      };
    },

    getNodeKeyword: function () {
      return ReactDOM.findDOMNode(this.refs.searchKeyword);
    },

    getMovieList: function (query) {
      var obj = {list: [], spinner: {show: true}};

      // show spinner
      this.props.changeSearchResult(obj);

      // get data
      superagent
        .get(this.props.api.uri)
        .set('Accept', 'application/json')
        .query(query)
        .end(function (err, res) {
          var msg = err || res.body.Error;

          if (msg) {
            alert(msg);
          } else {
            obj.list = res.body.Search;
          }

          // hide spinner
          obj.spinner.show = false;

          this.props.changeSearchResult(obj);
        }.bind(this));
    },

    componentDidMount: function () {
      this.getNodeKeyword().focus();
    },

    handleKeyDown: function (e) {
      // only enter
      if (e.keyCode !== KEYS.ENTER) { return; }

      this.getMovieList({s: this.getNodeKeyword().value});
    },

    handleClick: function (e) {
      this.getMovieList({s: this.getNodeKeyword().value});

      this.getNodeKeyword().focus();
    },

    render: function () {
      return (
        <section className="todo-header">
          <h1 className="title">Todo-js</h1>
          <div className="search-area">
            <input type="text" ref="searchKeyword" className="input-search" placeholder="Find the movie title" onKeyDown={this.handleKeyDown} />
            <button type="button" className="btn-search" onClick={this.handleClick}>검색</button>
          </div>
        </section>
      );
    }

  });

  return app;

}(window.app || {}));

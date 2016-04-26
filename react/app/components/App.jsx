(function () {

  'use strict';

  var OMDB = {
    API_KEY: 'da64071f',
    API_URI_IMG: 'http://img.omdbapi.com/',
    API_URI_DATA: 'http://www.omdbapi.com/'
  };

  var KEYS = {
    ENTER: 13
  };

  var Spinner = React.createClass({

    propTypes: {
      show: React.PropTypes.bool,
      rectCount: React.PropTypes.number
    },

    getDefaultProps: function () {
      return {
        show: false,
        rectCount: 5
      };
    },

    render: function () {
      var rects = [];

      for (var i = 0; i < this.props.rectCount; i++) {
        rects.push(<i key={i} className="rect"></i>);
      }

      return (
        <ul className="list-movie">
          <li>
            <div className="spinner">
              {rects}
            </div>
          </li>
        </ul>
      );
    }

  });

  var List = React.createClass({

    propTypes: {
      list: React.PropTypes.array.isRequired
    },

    getDefaultProps: function () {
      return {
        list: []
      };
    },

    render: function () {
      return (
        <ul className="list-movie">
          {this.props.list.map(function (item, key) {
            var imgSrc = OMDB.API_URI_IMG + '?i=' + item.imdbID + '&apikey=' + OMDB.API_KEY;

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

  });

  var TodoMain = React.createClass({

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
          <Spinner show={this.props.spinner.show} rectCount={this.props.spinner.rectCount} />
        );
      } else {
        main = (
          <List list={this.props.list} />
        );
      }

      return (
        <section className="todo-main">
          {main}
        </section>
      );
    }

  });

  var AppHeader = React.createClass({

    getNodeKeyword: function () {
      return ReactDOM.findDOMNode(this.refs.searchKeyword);
    },

    getMovieList: function (query) {
      var obj = {list: [], spinner: {show: true}};

      // show spinner
      this.props.changeSearchResult(obj);

      // get data
      superagent
        .get(OMDB.API_URI_DATA)
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

  var App = React.createClass({

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
          <AppHeader changeSearchResult={this.changeSearchResult} />
          <TodoMain list={this.state.list} spinner={this.state.spinner} />
        </div>
      );
    }

  });

  ReactDOM.render(<App />, document.getElementById('rc-app'));

}());

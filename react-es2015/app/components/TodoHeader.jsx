import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

const KEYS = {
  ENTER: 13,
};

const defaultProps = {
  api: {
    uri: 'http://www.omdbapi.com/',
  },

  changeSearchResult() {
  },
};

class TodoHeader extends React.Component {

  constructor() {
    super();

    this.getNodeKeyword = this.getNodeKeyword.bind(this);
    this.getMovieList = this.getMovieList.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getNodeKeyword() {
    return ReactDOM.findDOMNode(this.refs.searchKeyword);
  }

  getMovieList(query) {
    let obj = {
      list: [],
      spinner: {
        show: true,
      },
    };

    this.props.changeSearchResult(obj);

    superagent
      .get(this.props.api.uri)
      .set('Accept', 'application/json')
      .query(query)
      .end((err, res) => {
        const msg = err || res.body.Error;

        if (msg) {
          alert(msg);
        } else {
          obj.list = res.body.Search;
        }

        obj.spinner.show = false;

        this.props.changeSearchResult(obj);
      });
  }

  componentDidMount() {
    this.getNodeKeyword().focus();
  }

  handleKeyDown(e) {
    if (e.keyCode !== KEYS.ENTER) { return; }

    this.getMovieList({
      s: this.getNodeKeyword().value,
    });
  }

  handleClick(e) {
    this.getMovieList({
      s: this.getNodeKeyword().value,
    });
    this.getNodeKeyword().focus();
  }

  render() {
    return (
      <section className="todo-header">
        <h1 className="title">Todo-js</h1>
        <div className="search-area">
          <input
            type="text"
            ref="searchKeyword"
            className="input-search"
            placeholder="Find the movie title"
            onKeyDown={this.handleKeyDown}
          />
          <button
            type="button"
            className="btn-search"
            onClick={this.handleClick}
          >
            검색
          </button>
        </div>
      </section>
    );
  }

}

TodoHeader.defaultProps = defaultProps;

export default TodoHeader;

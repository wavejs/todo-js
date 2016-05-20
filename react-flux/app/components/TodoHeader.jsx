import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import superagent from 'superagent';
import { updateList } from '../actions/TodoActions';

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

class TodoHeader extends Component {

  constructor() {
    super();

    this.getMovieList = this.getMovieList.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.search = findDOMNode(this.refs.searchKeyword);
    this.search.focus();
  }

  getMovieList(query) {
    let obj = {
      list: [],
      spinner: {
        show: true,
        rectCount: 5,
      },
    };

    updateList(obj);

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

        updateList(obj);
      });
  }

  handleKeyDown(e) {
    if (e.keyCode !== KEYS.ENTER) { return; }

    this.getMovieList({
      s: this.search.value,
    });
  }

  handleClick(e) {
    this.getMovieList({
      s: this.search.value,
    });
    this.search.focus();
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

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';

class TodoApp extends Component {

  constructor() {
    super();

    this.changeSearchResult = this.changeSearchResult.bind(this);
    this.state = {
      list: [],
      spinner: {
        show: false,
        rectCount: 5,
      },
    };
  }

  changeSearchResult(obj) {
    this.setState({
      list: obj.list,
      spinner: {
        show: obj.spinner.show,
        rectCount: obj.spinner.rectCount,
      },
    });
  }

  render() {
    return (
      <div>
        <TodoHeader changeSearchResult={this.changeSearchResult} />
        <TodoMain
          list={this.state.list}
          spinner={this.state.spinner}
        />
      </div>
    );
  }

}

render(<TodoApp />, document.getElementById('rc-app'));

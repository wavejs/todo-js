import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import TodoStore from '../stores/TodoStore';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';

class TodoApp extends Component {

  constructor() {
    super();

    this.changeSearchResult = this.changeSearchResult.bind(this);
    this.state = TodoStore.getAll();
    // this.state = {
    //   list: [],
    //   spinner: {
    //     show: false,
    //     rectCount: 5,
    //   },
    // };

  }

  componentDidMount() {
    TodoStore.addChangeListener(this.changeSearchResult);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this.changeSearchResult);
  }

  changeSearchResult(obj) {
    this.setState(TodoStore.getAll());
    // this.setState({
    //   list: obj.list,
    //   spinner: {
    //     show: obj.spinner.show,
    //     rectCount: obj.spinner.rectCount,
    //   },
    // });
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

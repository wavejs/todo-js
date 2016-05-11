import React from 'react';
import ReactDOM from 'react-dom';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';

class TodoApp extends React.Component {

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

ReactDOM.render(<TodoApp />, document.getElementById('rc-app'));

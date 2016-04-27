window.app = (function (app) {

  'use strict';

  app.TodoSpinner = React.createClass({

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

  return app;

}(window.app || {}));

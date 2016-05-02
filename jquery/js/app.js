jQuery(function($) {
  'use strict';

  var API_KEY = 'da64071f';
  var ENTER_KEY = 13;

  var App = {
    inProgress : false,

    init: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      $('[data-button=search]').on('click', this.searchFunc.bind(this));
      $('[data-input=search]').on('keydown', this.editKeydown.bind(this));
    },

    creatDom: {
      // 로딩 바 출력
      loading: function($elem) {
        var $spinner = $('<div/>', {'class': 'spinner'});
        var $li = $('<li/>', {'data-loading': 'spinner'});

        $elem.append($li);
        $li.append($spinner);

        var barLength = 5;
        for (var i = 0; i < barLength; i++) {
          var $rect = '<i class="rect"></i>&nbsp;';
          $spinner.append($rect);
        }
      },

      // 리스트 출력
      success: function($elem) {
        // <li>
        //   <div class="thumb">
        //     <img src="" alt="" data-image="poster">
        //   </div>
        //   <div class="info">
        //     <div class="title" data-title="movie"></div>
        //   </div>
        // </li>
        var $li = $('<li/>'),
            $thumb = $('<div/>', {'class': 'thumb'}),
            $img = $('<img/>', {'alt': '', 'data-image': 'poster'}),
            $info = $('<div/>', {'class': 'info'}),
            $title = $('<div/>', {'class': 'title', 'data-title': 'movie'});
        $elem.append($li);
        $li.append($thumb, $info);
        $thumb.append($img);
        $info.append($title);
      },

      // Error 출력 (데이터 X, api호출 X)
      error: function($elem, text) {
        var e = '<li class="error">' + text + '</li>';
        $elem.append(e);
      }
    },

    // 출력 데이터 선언
    successData: function(data, selectorUl) {
      var self = this;

      $.each(data, function(i) {
        var _img = 'http://img.omdbapi.com/?i=' + data[i].imdbID + '&apikey=' + API_KEY;
        var _title = data[i].Title;
        var _year = data[i].Year;

        // 리스트 Dom 생성
        self.creatDom.success(selectorUl);

        var _eq = i + 1; // 1 = 기존 노출되고 있는 로딩 바
        var $li = selectorUl.find('li').eq(_eq);
        var $img = $li.find('[data-image=poster]');
        var $title = $li.find('[data-title=movie]');

        $img.attr({
          src: _img,
          alt: _title
        });
        $title.append(_title + ' (' + _year + ')');
      });
    },

    // 검색 결과
    searchFunc: function() {
      var self = this;
      var $ul = $('[data-list=movie]');
      var $inp = $('[data-input=search]');

      var isEmpty = $inp.val() === '';
      var inputValue = $inp.val().trim();

      if (isEmpty) {
        alert('검색어를 입력하세요!');
      } else if ((!isEmpty) && (self.inProgress === false)) {
        self.inProgress = true;
        $ul.empty(); // 리스트 목록 삭제
        self.creatDom.loading($ul); // 로딩 바 출력

        $.ajax({
          type: 'GET',
          url: 'http://omdbapi.com/?s=' + inputValue,
          dataType: 'json',

          success: function(response) {
            var searchs = response.Search;
            var isSuccess = (response.Response === 'True') && (searchs.length > 0)

            if (isSuccess) {
              self.successData(searchs, $ul);
            } else {
              self.creatDom.error($ul, '"' + inputValue + '" 의 검색 결과가 없습니다.');
            }
          },

          complete: function() {
            self.inProgress = false;
            $ul.find('[data-loading=spinner]').remove();
          },

          error: function() {
            self.creatDom.error($ul, '문제가 발생했습니다. 잠시 후 다시 시도하세요.');
          }
        });
      }
    },

    // Enter 키보드 keydown 이벤트
    editKeydown: function(e) {
      var keyCode = e.which || e.keyCode;

      if (keyCode === ENTER_KEY) {
        this.searchFunc();
      }
    }
  };

  App.init();
});
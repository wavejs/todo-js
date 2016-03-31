jQuery(function($) {
  'use strict';

  var ENTER_KEY = 13;

  var App = {
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
        var e = '';
        e += '<li data-loading="spinner">';
        e += '  <div class="spinner">';
        e += '    <i class="rect"></i>';
        e += '    <i class="rect"></i>';
        e += '    <i class="rect"></i>';
        e += '    <i class="rect"></i>';
        e += '    <i class="rect"></i>';
        e += '  </div>';
        e += '</li>';
        $elem.append(e);
      },
      // 리스트 출력
      success: function($elem) {
        var e = '';
        e += '<li>'
        e += '  <div class="thumb">'
        e += '    <img src="" alt="" data-image="poster">'
        e += '  </div>'
        e += '  <div class="info">'
        e += '    <div class="title" data-title="movie"></div>'
        e += '  </div>'
        e += '</li>'
        $elem.append(e);
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
        var _img = data[i].Poster;
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
      } else {
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
      if (e.which === ENTER_KEY) {
        this.searchFunc();
      }
    }
  };

  App.init();
});
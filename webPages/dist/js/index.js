var Ajax, InitIndex;

Ajax = (function() {
  function Ajax() {
    this.host = 'http://139.198.14.56/';
    this.XML = new XMLHttpRequest();
  }

  Ajax.prototype.get = function(url, callback) {
    this.XML.open('GET', url);
    this.XML.send();
    return this.XML.onreadystatechange = (function(_this) {
      return function() {
        if (_this.XML.readyState === 4) {
          return callback(_this.XML.response);
        }
      };
    })(this);
  };

  return Ajax;

})();

window.api = new Ajax();

InitIndex = (function() {
  function InitIndex() {
    this.panelStatus = false;
    this.playStatus = false;
    this.changeRateStatus = true;
    this.wrapLeft = $('#panel').css('width');
    this.pullBottom = $('#changeRate').css('height');
    this.host = 'http://139.198.14.56/';
    this.onMenuBtnClick();
    this.onPullBtnClick();
  }

  InitIndex.prototype.onMenuBtnClick = function() {
    return $('#menu-btn').click((function(_this) {
      return function() {
        if (!_this.panelStatus) {
          $('#wrap').animate({
            left: _this.wrapLeft
          });
          return _this.panelStatus = true;
        } else {
          $('#wrap').animate({
            left: '0px'
          });
          return _this.panelStatus = false;
        }
      };
    })(this));
  };

  InitIndex.prototype.onPullBtnClick = function() {
    return $('#pull-btn').click((function(_this) {
      return function() {
        if (_this.changeRateStatus) {
          $('#second-bg').animate({
            bottom: '0px'
          });
          return _this.changeRateStatus = false;
        } else {
          $('#second-bg').animate({
            bottom: _this.pullBottom
          });
          return _this.changeRateStatus = true;
        }
      };
    })(this));
  };

  return InitIndex;

})();

$(document).ready(function() {
  return new InitIndex();
});

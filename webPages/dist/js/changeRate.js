var ScrollerTrack;

ScrollerTrack = (function() {
  function ScrollerTrack() {
    this.BODYWIDTH = 2100;
    this.MAX = 108;
    this.MIN = 87.5;
    this.COUNT = 0;
    this.SCALE = 10;
    this.currentX = 0;
    this.currentValue = 93.0;
    this.host = 'http://139.198.14.56/';
    this.noMusic = false;
    this.play = false;
    this.currentMusicId = null;
    this.init();
    this.bindMusicListClickHandle();
  }

  ScrollerTrack.prototype.bindMusicListClickHandle = function() {
    $('#musicList').on('click', (function(_this) {
      return function(event) {
        event.stopPropagation();
        if (_this.play) {
          return _this.playMusic(event.target.id);
        } else {
          return _this.pauseMusic();
        }
      };
    })(this));
    return $('#play-btn').on('click', (function(_this) {
      return function() {
        var playBtn;
        playBtn = document.getElementById('play-btn');
        if (_this.currentMusicId) {
          if (_this.play) {
            playBtn.src = 'imgs/pauseBtn.png';
            _this.pauseMusic();
            return _this.play = false;
          } else {
            playBtn.src = 'imgs/playBtn.png';
            _this.playMusic(_this.currentMusicId);
            return _this.play = true;
          }
        }
      };
    })(this));
  };

  ScrollerTrack.prototype.init = function() {
    var dials, dialsWidth, i, itemWidth, r, results, scale, span;
    $('#contain').css('width', this.BODYWIDTH + 'px');
    this.COUNT = (this.MAX - this.MIN) / 1;
    itemWidth = this.BODYWIDTH / this.COUNT;
    scale = this.SCALE;
    dialsWidth = itemWidth / 10;
    i = 0;
    results = [];
    while (i < this.COUNT) {
      span = document.createElement('span');
      span.style.width = itemWidth + 'px';
      span.style.marginLeft = i * itemWidth - itemWidth * 5 + 'px';
      span.style.color = '#fff';
      span.innerHTML = (i + 88) + '.0';
      $('#value').append(span);
      r = 0;
      while (r < scale) {
        dials = document.createElement('span');
        dials.style.width = dialsWidth + 'px';
        dials.style.marginLeft = r * dialsWidth + 'px';
        dials.style.left = 0;
        span.appendChild(dials);
        r++;
      }
      i++;
      this.value();
      results.push(this.getCurrentChannelList());
    }
    return results;
  };

  ScrollerTrack.prototype.value = function() {
    var isMoving;
    isMoving = false;
    return document.getElementById('contain').addEventListener('touchstart', (function(_this) {
      return function(e) {
        var containMarginRight, downX, len, val;
        containMarginRight = $('#contain').css('marginRight');
        len = containMarginRight.length;
        val = parseInt(containMarginRight.slice(0, len - 2));
        downX = e.touches[0].clientX;
        isMoving = true;
        window.addEventListener('touchmove', function(e) {
          var changeX, v;
          e.preventDefault();
          _this.currentX = val;
          if (!isMoving) {
            return false;
          }
          changeX = downX - e.touches[0].clientX;
          if (changeX >= 0) {
            _this.currentX += changeX;
          } else {
            changeX = -changeX;
            _this.currentX -= changeX;
          }
          if (_this.currentX <= 0) {
            $('#contain').css('margin-right:875px;');
            $('#FMRate').text('87.5');
            _this.currentX = 87.5;
            return _this.currentValue = 87.5;
          } else if (_this.currentX >= (_this.BODYWIDTH - 1)) {
            $('#contain').css('margin-right', (_this.BODYWIDTH - 1) + 'px');
            $('#FMRate').text(_this.MAX);
            _this.currentX = _this.MAX;
            return _this.currentValue = _this.MAX;
          } else {
            $('#contain').css('margin-right', _this.currentX + 'px');
            v = (_this.MAX - _this.MIN) * (_this.currentX / _this.BODYWIDTH) + 87.5;
            $('#FMRate').text(parseFloat(v).toFixed(1));
            return _this.currentValue = parseFloat(v).toFixed(1);
          }
        });
        return document.getElementById('changeRate').addEventListener('touchend', function() {
          _this.getCurrentChannelList();
          return isMoving = false;
        });
      };
    })(this));
  };

  ScrollerTrack.prototype.getCurrentChannelList = function() {
    return api.get(this.host + 'play2.php?Channel=' + this.currentValue, (function(_this) {
      return function(data) {
        var k, musicId, musicList, v;
        data = JSON.parse(data);
        musicList = data;
        if (musicList.length === 1) {
          if (musicList[0].Status === '-1') {
            _this.noMusic = true;
          } else {
            _this.noMusic = false;
          }
        } else {
          _this.noMusic = false;
        }
        for (k in data) {
          v = data[k];
          if (data[k].Status === 0) {
            musicId = data[k].ID;
            _this.playMusic(musicId);
          }
        }
        return _this.updateMusicList(musicList);
      };
    })(this));
  };

  ScrollerTrack.prototype.updateMusicList = function(musicList) {
    var k, li, name, results, v;
    $('#musicList').empty();
    if (this.noMusic) {
      li = document.createElement('li');
      li.innerText = '该频道暂无音乐';
      $(li).appendTo('#musicList');
      return;
    }
    results = [];
    for (k in musicList) {
      v = musicList[k];
      if (musicList[k].ID) {
        if (musicList[k].Status === '0') {
          this.playMusic(musicList[k].ID);
        }
        li = document.createElement('li');
        li.id = musicList[k].ID;
        name = musicList[k].SName.slice(0, 7);
        li.innerText = name;
        results.push($(li).appendTo('#musicList'));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ScrollerTrack.prototype.playMusic = function(id) {
    var audio, playBtn;
    this.currentMusicId = id;
    $('#bgMusic').remove();
    audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.src = this.host + 'phpfiles/' + id + '.mp3';
    $(audio).appendTo('body');
    audio.play();
    playBtn = document.getElementById('play-btn');
    playBtn.src = 'imgs/pauseBtn.png';
    return this.play = true;
  };

  ScrollerTrack.prototype.pauseMusic = function() {
    var audio;
    audio = document.getElementById('bgMusic');
    return audio.pause();
  };

  return ScrollerTrack;

})();

$(document).ready(function() {
  return new ScrollerTrack();
});

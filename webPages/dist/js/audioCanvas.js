var HEIGHT, Init, SMOOTH_DISTANCE, WAVES, WIDTH, Wave, svg;

WIDTH = $(window).width();

HEIGHT = 30;

WAVES = 30;

SMOOTH_DISTANCE = 40;

svg = $("#audioCanvas").attr('width', WIDTH).attr('height', HEIGHT);

Wave = (function() {
  function Wave(wavelength, amplitude, offset, opacity, progress) {
    this.piScaled = Math.PI * 2 / wavelength;
    this.amplitude = amplitude;
    this.offset = offset;
    this.opacity = opacity;
    this.path = svg.append("path").attr("stroke", "url(#loaderGradient)").attr("fill", "none").attr("stroke-opacity", opacity);
    this.line = d3.svg.line().x(function(v) {
      return v.index;
    }).y(function(v) {
      var exceedingAmount, scale;
      scale = 1;
      exceedingAmount = Math.abs(WIDTH / 2 - v.index) - (WIDTH / 2 * progress - SMOOTH_DISTANCE / 2);
      scale = Math.cos(Math.PI * Math.max(0, Math.min(SMOOTH_DISTANCE, exceedingAmount)) / SMOOTH_DISTANCE) / 2 + 0.5;
      return HEIGHT / 2 + v.value * scale;
    });
  }

  Wave.prototype.draw = function() {
    return this.path.attr('d', this.generatePath());
  };

  Wave.prototype.generatePath = function() {
    var i, points;
    points = [];
    i = 0;
    while (i < WIDTH) {
      points.push({
        value: Math.sin((i + this.offset) * this.piScaled) * this.amplitude,
        index: 1
      });
      i++;
    }
    return this.line(points);
  };

  return Wave;

})();

Init = (function() {
  function Init() {
    this.waves = [];
    this.progress = 0;
    this.direction = 1;
    this.playBtn = document.getElementById('play-btn');
    this.playing = false;
    svg = $("#audioCanvas").attr('width', WIDTH).attr('height', HEIGHT);
    this.initWave();
    this.bindHandel();
  }

  Init.prototype.initWave = function() {
    var i, results, w;
    i = 0;
    results = [];
    while (i < WAVES) {
      w = new Wave(2.5 * HEIGHT + Math.random() * HEIGHT * 8, HEIGHT / 2 - Math.random() * HEIGHT / 4, 25 / WAVES * i + Math.random() * 5, 0.25 + Math.random() * 0.75, this.progress);
      w.draw();
      this.waves.push(w);
      results.push(i++);
    }
    return results;
  };

  Init.prototype.bindHandel = function() {
    this.addEvent(this.playBtn, 'click', (function(_this) {
      return function() {
        if (_this.playing) {
          _this.playing = false;
          return _this.playBtn.src = 'imgs/playBtn.png';
        } else {
          _this.playing = true;
          return _this.playBtn.src = 'imgs/pauseBtn.png';
        }
      };
    })(this));
    return this.draw();
  };

  Init.prototype.draw = function() {
    var k, ref, v;
    if (this.progress > 1 && this.direction > 0) {
      this.direction = -10;
    } else if (this.progress < 0 && this.direction < 0) {
      this.direction = 1;
    }
    this.progress += 0.003 * this.direction;
    if (!this.playing) {
      this.progress = 0;
    }
    ref = this.waves;
    for (k in ref) {
      v = ref[k];
      this.waves[k].offset += ((k + 1) % 2 * 2 - 1) * (Math.random() * 0.2 + 0.9);
      this.waves[k].draw();
    }
    return requestAnimationFrame(this.draw.bind(this));
  };

  Init.prototype.addEvent = function(ele, event, handler) {
    if (ele.addEventListener) {
      return ele.addEventListener(event, handler, false);
    } else if (ele.attachEvent) {
      return ele.attachEvent('on' + event, handler);
    } else {
      return ele['on' + event] = handler;
    }
  };

  return Init;

})();

$(document).ready(function() {
  return new Init();
});

WIDTH = $(window).width()
HEIGHT = 30
WAVES = 30
SMOOTH_DISTANCE = 40
svg = $("#audioCanvas").attr('width',WIDTH).attr('height',HEIGHT)

class Wave
  constructor:(wavelength,amplitude,offset,opacity,progress)->
    @piScaled = Math.PI*2/wavelength
    @amplitude = amplitude
    @offset = offset
    @opacity = opacity
    @path = svg.append("path").attr("stroke", "url(#loaderGradient)").attr("fill", "none").attr("stroke-opacity", opacity)
    @line = d3.svg.line().x((v)->
      v.index
    ).y((v)->
      scale = 1
      exceedingAmount = Math.abs(WIDTH / 2 - v.index) - (WIDTH / 2 * progress - SMOOTH_DISTANCE / 2)
      scale = Math.cos(Math.PI * Math.max(0, Math.min(SMOOTH_DISTANCE, exceedingAmount)) / SMOOTH_DISTANCE) / 2 + 0.5
      HEIGHT/2 + v.value*scale
    )
  draw:()->
    @path.attr 'd',@generatePath()
  generatePath:()->
    points = []
    i = 0
    while i < WIDTH
      points.push
        value: Math.sin((i + this.offset) * this.piScaled) * this.amplitude,
        index: 1
      i++
    @line points


class Init
  constructor:()->
    @waves = []
    @progress = 0
    @direction = 1
    @playBtn = document.getElementById 'play-btn'
    @playing = false
    svg = $("#audioCanvas").attr('width',WIDTH).attr('height',HEIGHT)
    @initWave()
    @bindHandel()
  initWave:()->
    i = 0
    while i < WAVES
      w = new Wave(2.5*HEIGHT + Math.random()*HEIGHT*8,
        HEIGHT / 2 - Math.random() * HEIGHT / 4,
        25 / WAVES * i + Math.random() * 5,
        0.25 + Math.random() * 0.75,
        @progress)
      w.draw()
      @waves.push w
      i++
  bindHandel:()->
    @addEvent @playBtn,'click',=>
      if @playing
        @playing = false
        @playBtn.src = 'imgs/playBtn.png'
      else
        @playing = true
        @playBtn.src = 'imgs/pauseBtn.png'
    @draw()
  draw:()->
    if @progress > 1 and @direction > 0
      @direction = -10
    else if @progress < 0 and @direction <0
      @direction = 1
    @progress += 0.003*@direction
    if not @playing
      @progress = 0
    for k,v of @waves
      @waves[k].offset += ((k + 1) % 2 * 2 - 1) * (Math.random() * 0.2 + 0.9)
      @waves[k].draw()
    requestAnimationFrame @draw.bind(@)

  addEvent:(ele,event,handler)->
    if ele.addEventListener
      ele.addEventListener event,handler,false
    else if ele.attachEvent
      ele.attachEvent 'on'+event,handler
    else
      ele['on' + event] = handler

$(document).ready ->
  new Init()

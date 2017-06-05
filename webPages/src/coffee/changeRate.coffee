
class ScrollerTrack
  constructor:()->
    @BODYWIDTH = 2100
    @MAX = 108
    @MIN = 87.5
    @COUNT = 0
    @SCALE = 10
    @currentX = 0
    @currentValue = 93.0
    @host = 'http://139.198.14.56/'
    @noMusic = false
    @play = false
    @currentMusicId = null
    @init()
    @bindMusicListClickHandle()
  bindMusicListClickHandle:()->
    $('#musicList').on 'click',(event)=>
      event.stopPropagation()
      if @play
        @playMusic event.target.id
      else
        @pauseMusic()
    $('#play-btn').on 'click',()=>
      playBtn = document.getElementById 'play-btn'
      if @currentMusicId
        if @play
          playBtn.src = 'imgs/pauseBtn.png'
          @pauseMusic()
          @play = false
        else
          playBtn.src = 'imgs/playBtn.png'
          @playMusic(@currentMusicId)
          @play = true
  init:()->
    $('#contain').css 'width',@BODYWIDTH + 'px'
    @COUNT = (@MAX - @MIN)/1
    itemWidth = @BODYWIDTH/@COUNT
    scale = @SCALE
    dialsWidth = itemWidth/10
    i = 0
    while i<@COUNT
      span = document.createElement 'span'
      span.style.width = itemWidth + 'px'
      span.style.marginLeft = i*itemWidth - itemWidth*5 + 'px'
      span.style.color = '#fff'
      span.innerHTML = (i + 88) + '.0';
      $('#value').append span
      r = 0
      while r<scale
        dials = document.createElement 'span'
        dials.style.width = dialsWidth + 'px'
        dials.style.marginLeft = r*dialsWidth + 'px'
        dials.style.left = 0
        span.appendChild dials
        r++
      i++
      @value()
      @getCurrentChannelList()
  value:()->
    isMoving = false
    document.getElementById('contain').addEventListener 'touchstart',(e)=>
      containMarginRight = $('#contain').css('marginRight')
      len = containMarginRight.length
      val = parseInt(containMarginRight.slice(0,len-2))
      downX = e.touches[0].clientX
      isMoving = true
      window.addEventListener 'touchmove',(e)=>
        e.preventDefault()
        @currentX = val
        if not isMoving
          return false
        changeX = downX - e.touches[0].clientX
        if changeX >= 0
          @currentX += changeX
        else
          changeX = -changeX
          @currentX -= changeX
        if @currentX <= 0
          $('#contain').css 'margin-right:875px;'
          $('#FMRate').text '87.5'
          @currentX = 87.5
          @currentValue = 87.5
        else if @currentX >= (@BODYWIDTH - 1)
          $('#contain').css 'margin-right',(@BODYWIDTH - 1) + 'px'
          $('#FMRate').text @MAX
          @currentX = @MAX
          @currentValue = @MAX
        else
          $('#contain').css 'margin-right',@currentX + 'px'
          v = (@MAX - @MIN)*(@currentX/@BODYWIDTH) + 87.5
          $('#FMRate').text parseFloat(v).toFixed(1)
          @currentValue = parseFloat(v).toFixed(1)
      document.getElementById('changeRate').addEventListener 'touchend',=>
        @getCurrentChannelList()
        isMoving = false
  getCurrentChannelList:()->
    api.get @host + 'play2.php?Channel=' + @currentValue,(data)=>
      data = JSON.parse(data)
      musicList = data
      if musicList.length is 1
        if musicList[0].Status is '-1'
          @noMusic = true
        else
          @noMusic = false
      else
        @noMusic = false
      for k,v of data
        if data[k].Status is 0
          musicId = data[k].ID
          @playMusic(musicId)
      @updateMusicList(musicList)
  updateMusicList:(musicList)->
    $('#musicList').empty()
    if @noMusic
      li = document.createElement 'li'
      li.innerText = '该频道暂无音乐'
      $(li).appendTo '#musicList'
      return
    for k,v of musicList
      if musicList[k].ID
        if musicList[k].Status is '0'
          @playMusic musicList[k].ID
        li = document.createElement 'li'
        li.id = musicList[k].ID
        name = musicList[k].SName.slice 0,7
        li.innerText = name
        $(li).appendTo '#musicList'
  playMusic:(id)->
    @currentMusicId = id
    $('#bgMusic').remove()
    audio = document.createElement 'audio'
    audio.id = 'bgMusic'
    audio.src = @host + 'phpfiles/' + id + '.mp3'
    $(audio).appendTo 'body'
    audio.play()
    playBtn = document.getElementById 'play-btn'
    playBtn.src = 'imgs/pauseBtn.png'
    @play = true
  pauseMusic:()->
    audio = document.getElementById('bgMusic')
    audio.pause()

$(document).ready ->
  new ScrollerTrack()

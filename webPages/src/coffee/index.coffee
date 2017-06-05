class Ajax
  constructor:()->
    @host = 'http://139.198.14.56/'
    @XML = new XMLHttpRequest()
  get:(url,callback)->
    @XML.open 'GET',url
    @XML.send()
    @XML.onreadystatechange = =>
      if @XML.readyState is 4
        callback @XML.response

window.api = new Ajax()

class InitIndex
  constructor:()->
    @panelStatus = false
    @playStatus = false
    @changeRateStatus = true
    @wrapLeft = $('#panel').css 'width'
    @pullBottom = $('#changeRate').css 'height'
    @host = 'http://139.198.14.56/'
    @onMenuBtnClick()
    @onPullBtnClick()

  onMenuBtnClick:()->
    $('#menu-btn').click =>
      if not @panelStatus
        $('#wrap').animate {left: @wrapLeft }
        @panelStatus = true
      else
        $('#wrap').animate {left: '0px' }
        @panelStatus = false
  onPullBtnClick:()->
    $('#pull-btn').click =>
      if @changeRateStatus
        $('#second-bg').animate {bottom: '0px'}
        @changeRateStatus = false
      else
        $('#second-bg').animate {bottom: @pullBottom }
        @changeRateStatus = true

$(document).ready ->
  new InitIndex()

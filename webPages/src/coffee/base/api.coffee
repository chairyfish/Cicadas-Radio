class Api
  constructor:()->
    @host = 'http://139.198.14.56/'

  get:(path, success, fail)->
    $.ajax
      url: @host + path,
      method: 'get',
      data: {}
      success: success
      fail: fail

  post:(path, success, fail)->
    $.ajax
      url: @host + path
      method: 'post',
      data: data
      success: success
      fail: fail

  getCurrentChannelList:(data, success, fail)->
    @post 'play2.php?Channel=' + data.channel,success,fail

  getAllList:(success, fail)->
    @post 'allChannel.php',success,fail

module.exports = new Api()

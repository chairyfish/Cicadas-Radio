express = require 'express'
path = require 'path'
app = express()
server = require('http').createServer app

app.set 'port',7070
app.use express.static path.join __dirname,'dist'

server.listen app.get('port'),->
  console.log 'listen on:' + app.get 'port'

app.get '/',(req,res)->
  res.sendfile __dirname+'/index.html'

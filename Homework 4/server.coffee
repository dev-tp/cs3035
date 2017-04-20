express = require 'express'

app = do express

app.use express.static('client')

app.get '/', (request, response) ->
  response.sendFile 'client/index.html'

app.listen 8080, ->
  console.log 'Server is running on localhost, port 8080'

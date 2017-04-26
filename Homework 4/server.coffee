bodyparser = require 'body-parser'
express = require 'express'
mongojs = require 'mongojs'

app = do express
database = mongojs 'todolist', ['todolist']

app.use bodyparser.json()
app.use express.static('client')

app.get '/', (request, response) ->
  response.sendFile 'client/index.html'

app.get '/todolist', (request, response) ->
  database.todolist.find (error, objects) ->
    response.json [] if error
    response.json objects

app.get '/todolist/remove/:id', (request, response) ->
  id = request.params.id

  database.todolist.remove { _id: mongojs.ObjectId id }, (error, objects) ->
    response.redirect '/'

app.post '/todolist', (request, response) ->
  database.todolist.save request.body, (error, objects) ->
    response.json [] if error
    response.json objects

app.listen 8080, ->
  console.log 'Server is running on localhost, port 8080'

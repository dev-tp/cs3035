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

app.get '/todolist/done/:id/:state', (request, response) ->
  id = request.params.id
  state = !(request.params.state == 'true')

  database.todolist.update { _id: mongojs.ObjectId id }, {$set: { done: state }}, ->
    response.redirect '/'

app.get '/todolist/remove/:id', (request, response) ->
  id = request.params.id

  database.todolist.remove { _id: mongojs.ObjectId id }, ->
    response.redirect '/'

app.get '/todolist/update/:todo', (request, response) ->
  todo = JSON.parse request.params.todo
  id = todo._id

  delete todo._id

  database.todolist.update { _id: mongojs.ObjectId id }, todo, ->
    response.redirect '/'

app.post '/todolist', (request, response) ->
  database.todolist.save request.body, (error, objects) ->
    response.json [] if error
    response.json objects

app.listen 8080, ->
  console.log 'Server is running on localhost, port 8080'

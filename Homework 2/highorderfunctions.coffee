class TextCell
  constructor: (text) ->
    @text = text.split "\n"

  minWidth: ->
    @text.reduce(((width, line) ->
      Math.max(width, line.length)), 0)

  minHeight: -> @text.length

  draw: (width, height) ->
    result = []
    for i in [0...height]
      line = @text[i] or ''
      result.push(line + repeat(' ', width - line.length))
    result


class CenteredTextCell extends TextCell
  draw: (width, height) ->
    result = []
    for i in [0...height]
      line = @text[i] or ''
      centeredLine = repeat(' ', (width - line.length) / 2) + line
      centeredLine = centeredLine + repeat(' ', width - centeredLine.length) if centeredLine.length < width
      result.push centeredLine
    result


class BorderedCell extends TextCell
  draw: (width, height) ->
    result = []
    result.push repeat('-', width + 2)
    for i in [0...height]
      line = @text[i] or ''
      result.push('|' + line + repeat(' ', width - line.length) + '|')
    result.push repeat('-', width + 2)
    result


class Person
  constructor: (@name, @sex, @born, @died, @father, @mother) ->

  toString: ->
    "Name: #{@name}\nSex: #{@sex}\nBorn: #{@born}\nDied: #{@died}\nFather: #{@father}\nMother: #{@mother}"


repeat = (symbol, n) -> (symbol for [0...n]).join ''


drawTable = (rows) ->
  heights = rowHeights rows
  widths = columnWidths rows

  drawLine = (blocks, lineNumber) ->
    blocks.map((block) -> block[lineNumber]).join ' '

  drawRow = (row, rowNumber) ->
    blocks = row.map((cell, columnNumber) ->
      cell.draw(widths[columnNumber], heights[rowNumber]))

    blocks[0].map((_, lineNumber) -> drawLine(blocks, lineNumber)).join "\n"

  rows.map(drawRow).join "\n"


rowHeights = (rows) ->
  rows.map (row) ->
    row.reduce(((max, cell) -> Math.max(max, cell.minHeight())), 0)


columnWidths = (rows) ->
  rows[0].map (_, i) ->
    rows.reduce(((max, row) -> Math.max(max, row[i].minWidth())), 0)


upperCaseRows = (rows, affectedRowIndex) ->
  rows.map (cells, row) ->
    if row == affectedRowIndex
      cells.map (cell) ->
        cell.text = cell.text.map (string) ->
          string.toUpperCase()
        cell
    cells


upperCaseColumns = (rows, affectedColumnIndex) ->
  rows.map (cells) ->
    cells.map (cell, column) ->
      if column == affectedColumnIndex
        cell.text = cell.text.map (string) ->
          string.toUpperCase()
      cell
    cells


centeredElements = [
  [new CenteredTextCell('Bucco di Beppo'), new CenteredTextCell('$$$$')]
  [new CenteredTextCell("Denny's"), new CenteredTextCell('$')]
]

borderedElements = [
  [new BorderedCell('Bucco di Beppo'), new BorderedCell('$$$$')]
  [new BorderedCell("Denny's"), new BorderedCell('$')]
]

ancestry = [
  [new BorderedCell(new Person('Emma de Milliano', 'f', 1876, 1956, 'Petrus de Milliano', 'Sophia van Damme').toString())
   new BorderedCell(new Person('Caralus Haverbeke', 'm', 1832, 1905, 'Carel Haverbeke', 'Maria van Brussel').toString())
   new BorderedCell(new Person('Cad Have', 'm', 1900, 1905, 'Carel Haverbeke', 'Carel Haverbeke').toString())]
  [new BorderedCell(new Person('Emma de Milliano', 'f', 1876, 1956, 'Petrus de Milliano', 'Sophia van Damme').toString())
   new BorderedCell(new Person('Caralus Haverbeke', 'm', 1832, 1905, 'Carel Haverbeke', 'Maria van Brussel').toString())
   new BorderedCell(new Person('Cad Have', 'm', 1900, 1905, 'Carel Haverbeke', 'Carel Haverbeke').toString())]
  [new BorderedCell(new Person('Emma de Milliano', 'f', 1876, 1956, 'Petrus de Milliano', 'Sophia van Damme').toString())
   new BorderedCell(new Person('Caralus Haverbeke', 'm', 1832, 1905, 'Carel Haverbeke', 'Maria van Brussel').toString())
   new BorderedCell(new Person('Cad Have', 'm', 1900, 1905, 'Carel Haverbeke', 'Carel Haverbeke').toString())]
]

console.log 'Problem 1'
console.log drawTable centeredElements

console.log 'Problem 2'
console.log drawTable borderedElements

console.log 'Problem 5'
console.log drawTable ancestry

console.log 'Problem 6 - demo of functions of problems 3 and 4'
console.log drawTable(upperCaseColumns(upperCaseRows(ancestry, 0), 2))

var swmmnode = require('swmm-node')
var fs = require ('fs')

let test_Example1 = './test/data/Example1.out'
let text_output = './test/data/Example1.txt'

fs.readFile(test_Example1, function (err, data) {
  processOut(data.buffer)
})

processOut = (arrBuff) => {
  let example1 = new swmmnode.SwmmOut(arrBuff)
  let outString = ''
  console.log(example1.version())

  outString += stringOpeningRecords  (example1)
  outString += stringObjectIDs       (example1)
  outString += stringObjectProperties(example1)
  outString += stringClosingRecords  (example1)
  outString += '\n'
  
  // Get all of the system variables at a specific time period
  /*sys_idx_max = example1.systemOutputCount()
  period_max = example1.reportingPeriods()
  
  for(period = 1; period <= period_max; period++){
    let time = example1.swmmStepToDate(period)

    outString += period.toString().padEnd(12, ' ')
    outString += time  .toString().padEnd(25, ' ')
    for(index = 0; index < sys_idx_max; index++){
      outString += example1.sysOutput(index, period).toFixed(3).toString().padEnd(12, ' ')
    }
    outString += '\n'
  }*/

  fs.writeFile(text_output, outString, (err) => {
    if (err) console.log(err)
    else console.log('output written to file: ' + text_output)
  })
}

/**
 * Translate a float to a 12-character, 3-decimal string
 * padded with spaces.
 * @param {num} number input float number.
 * @return {string} a string that represents the number.
 */
function floatString(num) {
  return num.toFixed(3).toString().padEnd(12, ' ')
}

/**
 * Translate an int to a 12-character string
 * padded with spaces.
 * @param {num} number input integer number.
 * @return {string} a string that represents the number.
 */
function intString(num, len = 16) {
  return num.toString().padEnd(len, ' ')
}

/**
 * Translate string to a 24-character string
 * padded with spaces.
 * @param {str} number input string.
 * @return {string} a formatted string.
 */
function stringString(str, len = 24) {
  return str.padEnd(len, ' ')
}

/**
 * Separate subheaders and section contents with a 50-string set
 * of '-' characters and a newline
 * @param {title} string represents the subheader
 * @return {string} a string that represents the number.
 */
function subHeader(title, num = 50) {
  return title + '\n' +
  '-'.repeat(num) + '\n'
}

/**
 * Separate column headers and section contents with a 50-string set
 * of '-' characters and a newline
 * @param {columns} Array<Array<string, length>> represents the column
 * @return {string} a string that represents the columns header.
 */
function columnHeaders(columns) {
  let len = 0;
  return columns.map(val=>{
    len = len + val[1]
    return stringString(val[0], val[1])
  }).join('') + '\n' +
  '-'.repeat(len) + '\n'
}

/**
 * Create Object names section substring
 * @param {count} number count of object names
 * @param {funcs} Array<function> function array that retrieves the object value
 */
function objectNames(count, funcs){
  let str = ''
  for(i = 0; i < count; i++){
    str += intString(i)
    funcs.forEach((f)=>{
      str += stringString(f(i,).toString(), 16)
    })
    str += '\n'
     
  } 
  return str + '\n'
}

/**
 * Separate section titles and section contents with a 50-string set
 * of '=' characters and a newline
 * @return {string} a string that represents the number.
 */
function headerLine(num = 50) {
  return '='.repeat(num) + '\n'
}

/**
 * Break sections with 3 newline charaters
 * @return {string} a string that represents the number.
 */
function sectionBreak(num = 2) {
  return '\n'.repeat(num)
}

/**
 * Creates a simple section string of the format:
 * value valueDescription \n
 * @param {val} string represents the value
 * @param {section} number the section number of the simple line
 * @param {content} number the content number of the simple line
 * @return {string} the formatted line string.
 */
function simpleLine(val, section, content) {
  return val + swmmnode.SwmmOut.sections[section].contents[content].name + '\n'
}

/**
 * Change the Opening Records of a swmm .out file to a string.
 * @param {outObj} swmmnode.SwmmOut object.
 * @return: {string} String representation of the opening records section of a swmm.out file.
 */
function stringOpeningRecords(outObj){
  let section = swmmnode.SwmmOut.sections[0].name += '\n'
    + headerLine()
    + simpleLine(intString(outObj.magic1()),        0, 0)
    + simpleLine(intString(outObj.version()),       0, 1)
    + simpleLine(intString(outObj.flowUnitCode()),  0, 2)
    + simpleLine(intString(outObj.subcatchmentCount()), 0, 3)
    + simpleLine(intString(outObj.nodeCount()),     0, 4)
    + simpleLine(intString(outObj.linkCount()),     0, 5)
    + simpleLine(intString(outObj.pollutantCount()),0, 6)
    + sectionBreak()
  return section;
}

/**
 * Change the Closing Records of a swmm .out file to a string.
 * @param {outObj} swmmnode.SwmmOut object.
 * @return: {string} String representation of the closing records section of a swmm.out file.
 */
function stringClosingRecords(outObj){
  let section = swmmnode.SwmmOut.sections[6].name += '\n'
    + headerLine()
    + simpleLine(intString(outObj.objectIDNames()),    6, 0)
    + simpleLine(intString(outObj.objectProperties()), 6, 1)
    + simpleLine(intString(outObj.computedResults()),  6, 2)
    + simpleLine(intString(outObj.reportingPeriods()), 6, 3)
    + simpleLine(intString(outObj.errorCode()),        6, 4)
    + simpleLine(intString(outObj.magic2()),           6, 5)
    + sectionBreak()
  return section;
}

/**
 * Change the Object IDs section of a swmm .out file to a string.
 * @param {outObj} swmmnode.SwmmOut object.
 * @return: {string} String representation of the cObject IDs section of a swmm.out file.
 */
function stringObjectIDs(outObj){
  let section = swmmnode.SwmmOut.sections[1].name += '\n'
    + headerLine()
    + subHeader('Subcatchments')
    + columnHeaders([['index', 16], ['ID', 24]])
    + objectNames(outObj.subcatchmentCount(), [outObj.subcatchmentName.bind(outObj)])
    
    + subHeader('Nodes')
    + columnHeaders([['index', 16], ['ID', 24]])
    + objectNames(outObj.nodeCount(),         [outObj.nodeName.bind(outObj)])
    
    + subHeader('Links')
    + columnHeaders([['index', 16], ['ID', 24]])
    + objectNames(outObj.linkCount(),         [outObj.linkName.bind(outObj)])

    + subHeader('Pollutants')
    + columnHeaders([['index', 16], ['ID', 24]])
    + objectNames(outObj.pollutantCount(),    [outObj.pollutantName.bind(outObj)])
    
    + subHeader('Pollutants Concentration Units')
    + columnHeaders([['index', 16], ['Units', 24]])
    + objectNames(outObj.pollutantCount(),    [outObj.pollutantConcentrationUnits.bind(outObj)])
    + sectionBreak()
  return section;
}

/**
 * Change the Object Properties section of a swmm .out file to a string.
 * @param {outObj} swmmnode.SwmmOut object.
 * @return: {string} String representation of the cObject Properties section of a swmm.out file.
 */
function stringObjectProperties(outObj){
  let section = swmmnode.SwmmOut.sections[2].name += '\n'
    + headerLine()
    + subHeader('Subcatchments')
    + columnHeaders([['index', 16], ['ID', 24], ['Area', 16]])
    + objectNames(
      outObj.subcatchmentCount(), 
      [outObj.subcatchmentName.bind(outObj),
      outObj.subcatchmentArea.bind(outObj)])
    
    + subHeader('Nodes')
    + columnHeaders([['index', 16], ['ID', 16], ['Type', 16], ['Invert Elev.', 16], ['Max. Depth', 16]])
    + objectNames(
      outObj.nodeCount(), 
      [outObj.nodeName.bind(outObj),
      outObj.nodeTypeString.bind(outObj),
      outObj.nodeInvertElevation.bind(outObj),
      outObj.nodeMaximumDepth.bind(outObj),
    ])

    + subHeader('Links')
    + columnHeaders([['index', 16], ['ID', 16], ['Type', 16], ['US Invert', 16], ['DS Invert', 16], ['Max Depth', 16], ['Length', 16]])
    + objectNames(
      outObj.linkCount(), 
      [outObj.linkName.bind(outObj),
      outObj.linkTypeString.bind(outObj),
      outObj.linkUpstreamInvertOffset.bind(outObj),
      outObj.linkDownstreamInvertOffset.bind(outObj),
      outObj.linkMaximumDepth.bind(outObj),
      outObj.linkLength.bind(outObj),
    ])
    
    + sectionBreak()
  return section;
}
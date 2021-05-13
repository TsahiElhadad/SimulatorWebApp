// Node.js program to demonstrate the  
// fs.readFileSync() method 

// Include fs module
const fs = require('fs');
const { parse } = require('path');
var hybrid = require('./HybridAnomalyDetector');

// Calling the readFileSync() method
// to read 'input.txt' file
function csvJSON(csvPath) {
   const csv = fs.readFileSync(csvPath, { encoding: 'utf8', flag: 'r' });
    let lines = csv.split(/\r\n|\n|\r/);
    let numLines = lines.length - 1;
    let headers = lines[0].split(",");
    let numOfFeatures = headers.length;
    let result = {}
    for(let i = 0; i < numOfFeatures; i++) {
        result[headers[i]] = []
        for (let j = 1; j < numLines; j++) {
            let currentline = lines[j].split(",");
            result[headers[i]].push(parseFloat(currentline[i]))
        }
    }
    return JSON.stringify(result); //JSON
}
// Display the file data
//let csvPath1 = 'C:/Users/Asus/Desktop/anomalyTrain.csv';
//let csvPath2 = 'C:/Users/Asus/Desktop/anomalyTest.csv';
//let s1 = csvJSON(csvPath1);
//let s2 = csvJSON(csvPath2);

/// constructor - (make the matrix) save the data from the file in vectors as columns
class TimeSeries {
    constructor(csv) {
       //console.log(csvDict)
        //let csvDict = JSON.parse(csvJson);
        // this.featuresNames = Object.keys(csvDict);
        // this.numOfData = csvDict[this.featuresNames[0]].length;
        // this.numOfFeatures = Object.keys(csvDict).length
        // this.matrix = new Map();
        // for (let i = 0; i < this.numOfFeatures; i++) {
        //     this.matrix[this.featuresNames[i]] = [];
        // }
        // for (let key in csvDict) {
        //     this.matrix[key] = csvDict[key]
        // }
        //const csv = fs.readFileSync(csvDict, { encoding: 'utf8', flag: 'r' });
        let lines = csv.split(/\r\n|\n|\r/);
        this.numOfData = lines.length - 2;
        this.featuresNames = lines[0].split(",");
        this.numOfFeatures = this.featuresNames.length;
        this.matrix = new Map();
        for(let i = 0; i < this.numOfFeatures; i++) {
            this.matrix[this.featuresNames[i]] = []
            for (let j = 1; j <= this.numOfData; j++) {
                let currentline = lines[j].split(",");
                this.matrix[this.featuresNames[i]].push(parseFloat(currentline[i]))
            }
        }
    }

    getMapMatrix() {
        return this.matrix;
    }
    getNumOfData() {
        return this.numOfData;
    }
    getFeatureNames() {
        return this.featuresNames;
    }
    getNumOfFeatures() {
        return this.numOfFeatures;
    }
}
/*
var ts1 = new TimeSeries(s1);
var ts2 = new TimeSeries(s2);
var h = new hybrid.HybridAnomalyDetector();
h.learnNormal(ts1)
var vec = h.detect(ts2);
console.log(vec)*/
module.exports = { TimeSeries, csvJSON };

const fs = require('fs');
const { parse } = require('path');

/// class TimeSeries - saves every column of the csv in a list - and put all the lists in object.
class TimeSeries {
    constructor(csv) {
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

    /// return map that has all the data
    getMapMatrix() {
        return this.matrix;
    }

    /// returns number of lines of data in the file
    getNumOfData() {
        return this.numOfData;
    }

    /// return list that has the features names
    getFeatureNames() {
        return this.featuresNames;
    }

    /// returns number of features
    getNumOfFeatures() {
        return this.numOfFeatures;
    }
}

module.exports = { TimeSeries };

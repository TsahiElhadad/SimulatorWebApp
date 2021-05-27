var timeSeries = require('./timeseries');
var simple = require('./SimpleAnomalyDetector');
var hybrid = require('./HybridAnomalyDetector');

// Asynchronous function that get learnFile, DetectFile, and type of Algorithm and making anomalies list
// from the files we get and return it the anomalies list.
async function learnAndDetect(learnFile, detectFile, algoType) {
    let tsLearn = new timeSeries.TimeSeries(learnFile)
    let tsDetect = new timeSeries.TimeSeries(detectFile)
    let anomalyDetector
    if(algoType === "1") // using hybrid algorithm (learn by circle)
        anomalyDetector = new hybrid.HybridAnomalyDetector()
    else if(algoType === "2") // using simple algorithm (learn by line regression)
        anomalyDetector = new simple.SimpleAnomalyDetector()
     else { // user not pressed on type of algorithm.
        throw new Error("no algoType");
    }
    try {
    await anomalyDetector.learnNormal(tsLearn)
    let anomalyList = await anomalyDetector.detect(tsDetect) // get the anomalies list by detect
    return anomalyList
    } catch(error) {
         throw new Error(error)
    }
}

module.exports = { learnAndDetect };
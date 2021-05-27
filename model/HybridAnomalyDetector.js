var utilClass = require('./anomaly_detection_util');
var simpleClass = require('./SimpleAnomalyDetector');
const enclosingCircle = require('smallest-enclosing-circle')

/// class Circle
class Circle {
    constructor(c, r) {
        this.center = c;
        this.radius = r;
    }
}

/// class HybridAnomalyDetector - extends SimpleAnomalyDetector
class HybridAnomalyDetector extends simpleClass.SimpleAnomalyDetector {
    constructor() {
        super();
        this.correlationThresholdCircle = 0.5;
    }

    /// the function checks if the correlation is higher enough for create a struct and returns true if it does.
    isCorrelatedEnough(correlation) {
        return (Math.abs(correlation) > Math.min(this.correlationThresholdCircle, this.correlationThresholdLine));
    }

    /// the function completes updating the struct. the line will represent the center point of the circle we will
    /// create to check anomalies. line.a represents the center.x and line.b represents the center.y.
    /// the threshold will represent the radius of the circle.
    completeStruct(cfStruct, f1, f2, matrix, size) {
        if (Math.abs(cfStruct.correlation) > this.correlationThresholdLine) {
            return super.completeStruct(cfStruct, f1, f2, matrix, size);
        }
        let pointArr = [];
        let i;
        for (i = 0; i < size; i++) {
            let p = { x: matrix[f1][i], y: matrix[f2][i] };
            pointArr.push(p);
        }
        let circle = enclosingCircle(pointArr); /// create the minimum enclosing circle
        cfStruct.lin_reg = new utilClass.Line(circle.x, circle.y);
        cfStruct.threshold = circle.r * 1.1;
    }

    /// the function returns true if there is an anomaly in this line (if the point isnt in the circle). false otherwise.
    isAnomaly(ts, cfStruct, i) {
        if (Math.abs(cfStruct.correlation) > this.correlationThresholdLine) {
            return super.isAnomaly(ts, cfStruct, i);
        }
        let matrix = ts.getMapMatrix();
        let p = new utilClass.Point(matrix[cfStruct.feature1][i], matrix[cfStruct.feature2][i]);
        // as i mentioned above, the line in the struct represent the center point of the circle. threshold represents the radius.
        let circle = new Circle(new utilClass.Point(cfStruct.lin_reg.a, cfStruct.lin_reg.b), cfStruct.threshold);
        let distance = Math.sqrt(((circle.center.x - p.x) * (circle.center.x - p.x)) + ((circle.center.y - p.y) * (circle.center.y - p.y)));
        return distance > circle.radius;

    }
}

module.exports = { HybridAnomalyDetector };
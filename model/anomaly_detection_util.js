/// class Line
class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    f(x) { return a * x + b; }
}

/// class Point
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/// returns the average of X
function avg(x, size) {
    let sum = 0;
    let i;
    for (i = 0; i < size; i++) {
        sum += x[i];
    }
    return (sum / size);
}

/// returns the variance of X and Y
function variance(x, size) {
    let sum = 0;
    let u = avg(x, size);
    let i;
    for (i = 0; i < size; i++) {
        sum += Math.pow(x[i], 2.0);
    }
    sum = sum / size;
    return sum - Math.pow(u, 2.0);
}

/// returns the covariance of X and Y
function cov(x, y, size) {
    let sum = 0;
    for (let i = 0; i < size; i++) {
        sum += (x[i] * y[i]);
    }
    sum /= size;
    let covariance = sum - (avg(x, size) * avg(y, size));
    return covariance;
}

/// returns the Pearson correlation coefficient of X and Y
function pearson(x, y, size) {
    let numerator = cov(x, y, size);
    let denominator = Math.sqrt(variance(x, size)) * Math.sqrt(variance(y, size));
    return numerator / denominator;
}

/// performs a linear regression and returns the line equation
function linear_reg(x, y, size) {
    let covariance = cov(x, y, size);
    let vari = variance(x, size);
    let averageX = avg(x, size);
    let averageY = avg(y, size);
    let a = covariance / vari;
    let b = averageY - (a * averageX);
    return new Line(a, b);
}

/// returns the deviation between point p and the line
function dev(p, l) {
    let yOnLine = (l.a * p.x) + l.b;
    let distance = p.y - yOnLine;
    return Math.abs(distance);
}

module.exports = { Line, Point, variance, cov, pearson, linear_reg, dev, avg };
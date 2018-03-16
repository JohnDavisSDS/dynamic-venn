const TWO_PI = Math.PI * 2;

class VennArc {
    constructor(startAngle = 0, endAngle = TWO_PI, counterClockwise = false, setIndex = 0) {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.counterClockwise = counterClockwise;
        this.setIndex = setIndex;
    }
}

export default VennArc;
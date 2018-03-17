class VennIllustrationData {
    constructor(setCount, width, vennSections) {
        this.setCount = setCount;
        this.width = width;
        this.vennSections = vennSections;
        this.firstCircleRotationAngle = 3 * Math.PI / 2 - Math.PI / setCount;
    }

    circleRotationAngle(setIndex) {
        return this.firstCircleRotationAngle + setIndex * 2 * Math.PI / this.setCount;
    }

    centerOffset() {
        return this.width / 2;
    }

    circleOffset() {
        return Math.sqrt(2) * this.radius() / 2;
    }

    radius() {
        return this.width / 4;
    }
}

export default VennIllustrationData;
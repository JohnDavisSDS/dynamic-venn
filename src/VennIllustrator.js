import VennHelper from './VennHelper';

const SECTION_FILL_COLOR = "#5050FF";
const EMPTY_FILL_COLOR = "#FFFFFF";
const TEXT_FILL_COLOR = "#000000";

class VennIllustrator {
    constructor(canvasContext, vennIllustrationData) {
        this.canvasContext = canvasContext;
        this.vennIllustrationData = vennIllustrationData;
    }

    draw() {
        this._drawOuterSection();
        this._drawBox();
        this._drawLabels();
        this._drawInnerSections();
        this._drawCircles();
    }

    _drawOuterSection() {
        let outerSection = this.vennIllustrationData.vennSections.find(function(vennElement) {
            return vennElement.isOuterSection();
        });
        if (typeof(outerSection) === "object") {
            let width = this.vennIllustrationData.width;
            this._resetTransform();

            // Fill entire area
            this.canvasContext.fillStyle = SECTION_FILL_COLOR;
            this.canvasContext.beginPath();
            this.canvasContext.rect(0, 0, width, width);
            this.canvasContext.fill();

            // Clear circles
            this.canvasContext.fillStyle = EMPTY_FILL_COLOR;
            this.canvasContext.beginPath();
            this._drawArcs(outerSection.arcs);
            this.canvasContext.fill();
        }
    }

    _drawBox() {
        let width = this.vennIllustrationData.width;
        this._resetTransform();

        this.canvasContext.beginPath();
        this.canvasContext.rect(0, 0, width, width);
        this.canvasContext.stroke();
    }

    _drawCircles() {
        let circleOffset = this.vennIllustrationData.circleOffset();
        let radius = this.vennIllustrationData.radius();

        for (let setIndex = 0; setIndex < this.vennIllustrationData.setCount; setIndex++) {
            let rotationAngle = this.vennIllustrationData.circleRotationAngle(setIndex);

            this._centerTransform();
            this.canvasContext.rotate(rotationAngle);
            this.canvasContext.beginPath();
            this.canvasContext.arc(circleOffset, 0, radius, 0, 2 * Math.PI);
            this.canvasContext.stroke();
        }
    }

    _drawLabels() {
        let fontOffset = 2 * this.vennIllustrationData.centerOffset() / 3;
        this._centerTransform();

        let fontPixels = this._setFont();
        let charOffset = Math.trunc(-fontPixels / 2);
        this.canvasContext.fillStyle = TEXT_FILL_COLOR;
        this.canvasContext.fillText(VennHelper.getSetCharFromIndex(0), -fontOffset + charOffset, -fontOffset);
        this.canvasContext.fillText(VennHelper.getSetCharFromIndex(1), fontOffset, -fontOffset);
        if (this.vennIllustrationData.setCount === 3) {
            fontOffset = 15 * this.vennIllustrationData.centerOffset() / 16;
            this.canvasContext.fillText(VennHelper.getSetCharFromIndex(1), charOffset, fontOffset);
        }
    }

    _drawInnerSections() {
        this.canvasContext.fillStyle = SECTION_FILL_COLOR;

        this.vennIllustrationData.vennSections.forEach(function(vennSection) {
            this.canvasContext.beginPath();
            this._drawArcs(vennSection.arcs);
            this.canvasContext.fill();
        }, this);
    }

    _setFont() {
        let fontPixels = Math.trunc(this.vennIllustrationData.radius() / 6);

        this.canvasContext.font = fontPixels + "px Arial";
        return fontPixels;
    }

    _drawArcs(arcs) {
        arcs.forEach(function(arc) {
            let rotationAngle = this.vennIllustrationData.circleRotationAngle(arc.setIndex);
            let circleOffset = this.vennIllustrationData.circleOffset();
            let radius = this.vennIllustrationData.radius();

            this._centerTransform();
            this.canvasContext.rotate(rotationAngle);
            this.canvasContext.arc(circleOffset, 0, radius, arc.startAngle, arc.endAngle, arc.counterClockwise);
        }, this);
    }

    _centerTransform() {
        let offsetTranslation = this.vennIllustrationData.centerOffset();
        this.canvasContext.setTransform(1, 0, 0, 1, offsetTranslation, offsetTranslation);
    }

    _resetTransform() {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export default VennIllustrator;

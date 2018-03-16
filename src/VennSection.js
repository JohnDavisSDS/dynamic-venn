class VennSection {
    constructor(supersetIndexes = [], arcs = []) {
        this.supersetIndexes = supersetIndexes;
        this.arcs = arcs;
    }

    isOuterSection() {
        return this.supersetIndexes.length === 0;
    }

    belongsTo(setIndex) {
        return this.supersetIndexes.includes(setIndex);
    }
}

export default VennSection;
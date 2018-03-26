import VennArc from './VennArc';
import VennParseError from  './VennParseError';
import VennSection from './VennSection';

const SET_A_INDEX = 0;
const SET_B_INDEX = 1;
const SET_C_INDEX = 2;

const COMPLEMENT_CHAR = String.fromCharCode(8242);
const INTERSECTION_CHAR = String.fromCharCode(8898);
const UNION_CHAR = String.fromCharCode(8899);

const MIN_WIDTH = 200;
const MAX_WIDTH = 600;

const VENN_SECTIONS_TWO_SETS = {
    "SDiffAB": new VennSection(
        [],
        [
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, false, SET_B_INDEX)
        ]
    ),
    "ADiffB": new VennSection(
        [SET_A_INDEX],
        [
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, true, SET_B_INDEX)
        ]
    ),
    "BDiffA": new VennSection(
        [SET_B_INDEX],
        [
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(30 * Math.PI / 24, 18 * Math.PI / 24, true, SET_A_INDEX)
        ]
    ),
    "AIntersectB": new VennSection(
        [SET_A_INDEX, SET_B_INDEX],
        [
            new VennArc(18 * Math.PI / 24, 30 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(18 * Math.PI / 24, 30 * Math.PI / 24, false, SET_B_INDEX)
        ]
    )
};
const VENN_SECTION_NAMES_TWO_SETS = new Set([
    "SDiffAB",
    "ADiffB",
    "BDiffA",
    "AIntersectB"
]);
const VENN_SECTIONS_THREE_SETS = {
    "SDiffABC": new VennSection(
        [],
        [
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_C_INDEX)
        ]
    ),
    "ADiffBC": new VennSection(
        [SET_A_INDEX],
        [
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(35 * Math.PI / 24, 27 * Math.PI / 24, true, SET_B_INDEX),
            new VennArc(21 * Math.PI / 24, 13 * Math.PI / 24, true, SET_C_INDEX)
        ]
    ),
    "BDiffAC": new VennSection(
        [SET_B_INDEX],
        [
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(35 * Math.PI / 24, 27 * Math.PI / 24, true, SET_C_INDEX),
            new VennArc(21 * Math.PI / 24, 13 * Math.PI / 24, true, SET_A_INDEX)
        ]
    ),
    "CDiffAB": new VennSection(
        [SET_C_INDEX],
        [
            new VennArc(35 * Math.PI / 24, 13 * Math.PI / 24, false, SET_C_INDEX),
            new VennArc(35 * Math.PI / 24, 27 * Math.PI / 24, true, SET_A_INDEX),
            new VennArc(21 * Math.PI / 24, 13 * Math.PI / 24, true, SET_B_INDEX)
        ]
    ),
    "AIntersectBDiffC": new VennSection(
        [SET_A_INDEX, SET_B_INDEX],
        [
            new VennArc(27 * Math.PI / 24, 35 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(13 * Math.PI / 24, 21 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(27 * Math.PI / 24, 21 * Math.PI / 24, true, SET_C_INDEX)
        ]
    ),
    "AIntersectCDiffB": new VennSection(
        [SET_A_INDEX, SET_C_INDEX],
        [
            new VennArc(27 * Math.PI / 24, 35 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(13 * Math.PI / 24, 21 * Math.PI / 24, false, SET_C_INDEX),
            new VennArc(27 * Math.PI / 24, 21 * Math.PI / 24, true, SET_B_INDEX)
        ]
    ),
    "BIntersectCDiffA": new VennSection(
        [SET_B_INDEX, SET_C_INDEX],
        [
            new VennArc(27 * Math.PI / 24, 35 * Math.PI / 24, false, SET_C_INDEX),
            new VennArc(13 * Math.PI / 24, 21 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(27 * Math.PI / 24, 21 * Math.PI / 24, true, SET_A_INDEX)
        ]
    ),
    "AIntersectBC": new VennSection(
        [SET_A_INDEX, SET_B_INDEX, SET_C_INDEX],
        [
            new VennArc(21 * Math.PI / 24, 27 * Math.PI / 24, false, SET_A_INDEX),
            new VennArc(21 * Math.PI / 24, 27 * Math.PI / 24, false, SET_B_INDEX),
            new VennArc(21 * Math.PI / 24, 27 * Math.PI / 24, false, SET_C_INDEX)
        ]
    ),
};
const VENN_SECTION_NAMES_THREE_SETS = new Set([
    "SDiffABC",
    "ADiffBC",
    "BDiffAC",
    "CDiffAB",
    "AIntersectBDiffC",
    "AIntersectCDiffB",
    "BIntersectCDiffA",
    "AIntersectBC"
]);

class VennHelper {
    static get SET_A_INDEX() {
        return SET_A_INDEX;
    }

    static get SET_B_INDEX() {
        return SET_B_INDEX;
    }

    static get SET_C_INDEX() {
        return SET_C_INDEX;
    }

    static get COMPLEMENT_CHAR() {
        return COMPLEMENT_CHAR;
    }

    static get INTERSECTION_CHAR() {
        return INTERSECTION_CHAR;
    }

    static get UNION_CHAR() {
        return UNION_CHAR;
    }

    static get MIN_WIDTH() {
        return MIN_WIDTH;
    }

    static expectedWidth(windowWidth) {
        let width = Math.floor(windowWidth);
        if (width < MIN_WIDTH)
            return MIN_WIDTH;
        else if (width > MAX_WIDTH)
            return MAX_WIDTH;
        else
            return width;
    }

    static getAllVennSectionNames(setCount) {
        switch(setCount) {
            case 2:
                return VENN_SECTION_NAMES_TWO_SETS;
            case 3:
                return VENN_SECTION_NAMES_THREE_SETS;
            default:
                throw new Error("Invalid Argument");
        }
    }

    static getVennSection(setCount, sectionName) {
        switch(setCount) {
            case 2:
                return VENN_SECTIONS_TWO_SETS[sectionName];
            case 3:
                return VENN_SECTIONS_THREE_SETS[sectionName];
            default:
                throw new Error("Invalid Argument");
        }
    }

    static getSetCharFromIndex(setIndex) {
        return String.fromCharCode(setIndex + 65);
    }

    static getSetIndexFromChar(setChar) {
        return setChar.charCodeAt(0) - 65;
    }

    static getSetsFromFormula(setFormula, setCount) {
        const universalSet = VennHelper.getAllVennSectionNames(setCount);

        let subSets = [];
        for (let i = 0; i < setCount; i++) {
            subSets.push(new Set());
        }

        universalSet.forEach(function(setName) {
            const vennSection = VennHelper.getVennSection(setCount, setName);
            vennSection.supersetIndexes.forEach(function(setIndex) {
                subSets[setIndex].add(setName);
            });
        });

        let processedText = "";
        let stackIndex = 0;
        let formulaStack = [];
        formulaStack.push(VennHelper.newFormulaObject());

        const formulaArray = setFormula.split("");
        formulaArray.forEach(function(char, stringIndex) {
            let formulaObject = formulaStack[stackIndex];
            let nextFormulaObject;
            processedText += char;
            switch (char) {
                case " ":
                    break;
                case "(":
                    if ((formulaObject.leftSets !== null && formulaObject.binaryOperator === null)
                        || formulaObject.rightSets !== null) {
                        throw new VennParseError(stringIndex, "Expected operator, found '" + char + "'");
                    }
                    if (formulaObject.rightSets !== null) {
                        formulaStack[stackIndex] = VennHelper.evaluateBinaryOperation(formulaObject);
                    }
                    stackIndex += 1;
                    formulaStack[stackIndex] = VennHelper.newFormulaObject();
                    break;
                case ")":
                    if (stackIndex === 0) {
                        throw new VennParseError(stringIndex, "Unmatched ')'");
                    }
                    if (formulaObject.leftSets === null || (
                        formulaObject.binaryOperator !== null && formulaObject.rightSets === null)) {
                        throw new VennParseError(stringIndex, "Expected set, found '" + char + "'");
                    }
                    if (formulaObject.binaryOperator !== null) {
                        formulaObject = VennHelper.evaluateBinaryOperation(formulaObject);
                    }
                    stackIndex -= 1;
                    nextFormulaObject = formulaStack[stackIndex];
                    if (nextFormulaObject.binaryOperator !== null) {
                        nextFormulaObject.rightSets = formulaObject.leftSets;
                    }
                    else {
                        nextFormulaObject.leftSets = formulaObject.leftSets;
                    }
                    formulaStack[stackIndex] = nextFormulaObject;
                    break;
                case "-":
                case INTERSECTION_CHAR:
                case UNION_CHAR:
                    if (formulaObject.rightSets !== null) {
                        formulaObject = VennHelper.evaluateBinaryOperation(formulaObject);
                    }
                    if (formulaObject.leftSets === null || formulaObject.binaryOperator !== null) {
                        throw new VennParseError(stringIndex, "Expected set, found '" + char + "'");
                    }
                    formulaObject.binaryOperator = char;
                    formulaStack[stackIndex] = formulaObject;
                    break;
                case COMPLEMENT_CHAR:
                    if (formulaObject.leftSets === null || (
                        formulaObject.binaryOperator !== null && formulaObject.rightSets === null)) {
                        throw new VennParseError(stringIndex, "Expected set, found '" + char + "'");
                    }

                    nextFormulaObject = VennHelper.newFormulaObject();
                    nextFormulaObject.leftSets = universalSet;
                    nextFormulaObject.binaryOperator = "-";
                    if (formulaObject.rightSets !== null) {
                        nextFormulaObject.rightSets = formulaObject.rightSets;
                        nextFormulaObject = VennHelper.evaluateBinaryOperation(nextFormulaObject);
                        formulaObject.rightSets = nextFormulaObject.leftSets;
                    }
                    else {
                        nextFormulaObject.rightSets = formulaObject.leftSets;
                        nextFormulaObject = VennHelper.evaluateBinaryOperation(nextFormulaObject);
                        formulaObject.leftSets = nextFormulaObject.leftSets;
                    }
                    formulaStack[stackIndex] = formulaObject;
                    break;
                default:
                    if ((formulaObject.leftSets !== null && formulaObject.binaryOperator === null)
                        || formulaObject.rightSets !== null) {
                        throw new VennParseError(stringIndex, "Expected operator, found '" + char + "'");
                    }
                    const setIndex = VennHelper.getSetIndexFromChar(char);
                    let thisSet = new Set();
                    if (char === "S") {
                        thisSet = thisSet.union(universalSet);
                    }
                    else {
                        thisSet = thisSet.union(subSets[setIndex]);
                    }
                    if (formulaObject.binaryOperator !== null) {
                        formulaObject.rightSets = thisSet;
                    }
                    else {
                        formulaObject.leftSets = thisSet;
                    }
                    formulaStack[stackIndex] = formulaObject;
                    break;
            }
        });

        if (stackIndex !== 0) {
            throw new Error("Unmatched '('");
        }

        let formulaObject = formulaStack[stackIndex];
        if (formulaObject.binaryOperator !== null) {
            if (formulaObject.rightSets === null) {
                processedText = setFormula.replace(/[\s\uFEFF\xA0]+$/g, '');
                const stringIndex = processedText.length - 1;
                throw new VennParseError(stringIndex, "Binary operator missing second argument");
            }
            formulaObject = VennHelper.evaluateBinaryOperation(formulaObject);
        }

        let arcSets = [];
        formulaObject.leftSets.forEach(function(setName) {
            arcSets.push(VennHelper.getVennSection(setCount, setName));
        });

        return arcSets;
    }

    static newFormulaObject() {
        return {
            leftSets: null,
            binaryOperator: null,
            rightSets: null
        };
    }

    static evaluateBinaryOperation(formulaObject) {
        const leftSets = formulaObject.leftSets;
        const operator = formulaObject.binaryOperator;
        const rightSets = formulaObject.rightSets;
        let returnObject = VennHelper.newFormulaObject();

        switch(operator) {
            case "-":
                returnObject.leftSets = leftSets.difference(rightSets);
                break;
            case INTERSECTION_CHAR:
                returnObject.leftSets = leftSets.intersection(rightSets);
                break;
            case UNION_CHAR:
                returnObject.leftSets = leftSets.union(rightSets);
                break;
            default:
                throw new Error("Invalid binary operator");
        }

        return returnObject;
    }
}

export default VennHelper;
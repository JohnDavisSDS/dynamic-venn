import VennArc from './VennArc';
import VennSection from './VennSection';

const SET_A_INDEX = 0;
const SET_B_INDEX = 1;
const SET_C_INDEX = 2;

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
}

export default VennHelper;
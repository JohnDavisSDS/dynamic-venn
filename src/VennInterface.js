import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import VennButtons from "./VennButtons";
import VennFormula from "./VennFormula";
import VennHelper from "./VennHelper";
import VennIllustrationData from "./VennIllustrationData";
import VennParseError from "./VennParseError";

const defaultCharMap = {
    "u": VennHelper.UNION_CHAR,
    "U": VennHelper.UNION_CHAR,
    "i": VennHelper.INTERSECTION_CHAR,
    "I": VennHelper.INTERSECTION_CHAR,
    "'": VennHelper.COMPLEMENT_CHAR,
    "-": "-",
    "(": "(",
    ")": ")",
    " ": " ",
    "s": "S",
    "S": "S"
};

class VennInterface extends Component {
    constructor(props) {
        super(props);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextPaste = this.handleTextPaste.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleDiagramRender = this.handleDiagramRender.bind(this);
        this.charMap = {};
        this.state = {
            setFormulaText: "",
            errorIndex: 0,
            errorMessage: "",
            selectionStart: 0,
            selectionEnd: 0,
            paste: false
        };
    }

    handleSelectionChange(e) {
        this.setState({
            selectionStart: e.target.selectionStart,
            selectionEnd: e.target.selectionEnd
        });
    }

    handleTextChange(e) {
        if (this.state.paste) {
            this.setState({paste: false});
            return;
        }

        let selectionStart = e.target.selectionStart;
        let setFormulaText = e.target.value;

        const textArray = setFormulaText.split("");
        const charValues = Object.values(this.charMap);
        setFormulaText = "";
        textArray.forEach((char, index) => {
            if (this.charMap.hasOwnProperty(char)) {
                setFormulaText += this.charMap[char];
            }
            else if (charValues.includes(char)) {
                setFormulaText += char;
            }
            else if (index < selectionStart) {
                selectionStart -= 1;
            }
        });

        this.setState({setFormulaText, selectionStart, selectionEnd: selectionStart});
    }

    handleTextPaste(e) {
        let setFormulaText = e.target.value;
        const clipboardText = e.clipboardData.getData("text");
        const selectionStart = e.target.selectionStart;
        const selectionEnd = e.target.selectionEnd;

        const clipboardArray = clipboardText.split("");
        const charValues = Object.values(this.charMap);
        let pasteText = "";
        clipboardArray.forEach((char) => {
            if (this.charMap.hasOwnProperty(char)) {
                pasteText += this.charMap[char];
            }
            else if (charValues.includes(char)) {
                pasteText += char;
            }
        });

        setFormulaText = setFormulaText.slice(0, selectionStart) +
            pasteText +
            setFormulaText.slice(selectionEnd);

        const newSelectionIndex = selectionStart + pasteText.length;
        this.setState({
            setFormulaText,
            selectionStart: newSelectionIndex,
            selectionEnd: newSelectionIndex,
            paste: true
        });
    }

    handleButtonChange(char) {
        const setFormulaElement = document.getElementById("setFormulaTextInput");
        const selectionStart = this.state.selectionStart;
        const selectionEnd = this.state.selectionEnd;
        const currentFormula = this.state.setFormulaText;

        let newFormula = "";
        let newSelectionIndex = 0;
        if (char === "BS") {
            if (selectionStart !== selectionEnd) {
                newFormula = currentFormula.slice(0, selectionStart) +
                    currentFormula.slice(selectionEnd);
                newSelectionIndex = selectionStart;
            } else if (selectionStart !== 0) {
                newFormula = currentFormula.slice(0, selectionStart - 1) +
                    currentFormula.slice(selectionEnd);
                newSelectionIndex = selectionStart - 1;
            } else {
                return;
            }
        } else {
            newFormula = currentFormula.slice(0, selectionStart) +
                char +
                currentFormula.slice(selectionEnd);
            newSelectionIndex = selectionStart + 1;
        }
        setFormulaElement.setSelectionRange(newSelectionIndex, newSelectionIndex);
        this.setState({setFormulaText: newFormula, selectionStart: newSelectionIndex, selectionEnd: newSelectionIndex});
    }

    handleDiagramRender() {
        const currentVenn = this.props.vennIllustrationData;
        const setFormula = this.state.setFormulaText;

        let newVennSets;
        try {
            newVennSets = VennHelper.getSetsFromFormula(setFormula, currentVenn.setCount);
        }
        catch (error) {
            if (error instanceof VennParseError) {
                this.setState({errorIndex: error.errorIndex, errorMessage: error.message});
            }
            else {
                this.setState({errorIndex: 0, errorMessage: error.message});
            }
            return;
        }
        const newVenn = new VennIllustrationData(currentVenn.setCount, currentVenn.width, newVennSets, setFormula);

        this.setState({errorIndex: 0, errorMessage: ""});
        this.props.onDiagramRender(newVenn);
    }

    componentWillReceiveProps(nextProps) {
        const oldSetCount = this.props.vennIllustrationData.setCount;
        const newSetCount = nextProps.vennIllustrationData.setCount;

        if (oldSetCount !== newSetCount) {
                this.updateCharMap();
            this.setState({selectionStart: 0, selectionEnd: 0, setFormulaText: ""});
        }
    }

    render() {
        const setFormulaText = this.state.setFormulaText;
        const vennIllustrationData = this.props.vennIllustrationData;
        const errorIndex = this.state.errorIndex;
        const errorMessage = this.state.errorMessage;
        const errorState = setFormulaText.substr(errorIndex);


        return (
            <Box pad="small" colorIndex="light-1">
                <VennFormula
                    vennIllustrationData={vennIllustrationData}
                    setFormulaText={setFormulaText}
                    onChange={this.handleTextChange}
                    onPaste={this.handleTextPaste}
                    onDiagramRender={this.handleDiagramRender}
                    onSelectionChange={this.handleSelectionChange}
                />
                {errorMessage !== "" && errorIndex !== 0 &&
                <Notification status='critical' message={errorMessage} state={errorState}/>
                }
                {errorMessage !== "" && errorIndex === 0 &&
                <Notification status='critical' message={errorMessage}/>
                }
                <VennButtons vennIllustrationData={vennIllustrationData} onChange={this.handleButtonChange}/>
            </Box>
        );
    }

    componentWillMount() {
        this.updateCharMap();
    }

    updateCharMap() {
        this.charMap = Object.assign({}, defaultCharMap);
        const vennIllustrationData = this.props.vennIllustrationData;

        for (let i = 0; i < vennIllustrationData.setCount; i++) {
            const setChar = VennHelper.getSetCharFromIndex(i);
            this.charMap[setChar] = setChar;
            this.charMap[setChar.toLowerCase()] = setChar;
        }
    }
}

export default VennInterface;

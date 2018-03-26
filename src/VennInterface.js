import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import VennButtons from "./VennButtons";
import VennFormula from "./VennFormula";
import VennHelper from "./VennHelper";
import VennIllustrationData from "./VennIllustrationData";
import VennParseError from "./VennParseError";

class VennInterface extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleDiagramRender = this.handleDiagramRender.bind(this);
        this.state = {selectionStart: 0, selectionEnd: 0, setFormulaText: "", errorIndex: 0, errorMessage: ""};
    }

    handleTextChange(selectionStart, selectionEnd, value) {
        this.setState({selectionStart, selectionEnd, setFormulaText: value});
    }

    handleButtonChange(char) {
        const selectionStart = this.state.selectionStart;
        const selectionEnd = this.state.selectionEnd;
        const currentFormula = this.state.setFormulaText;

        const newFormula = currentFormula.slice(0, selectionStart) +
            char +
            currentFormula.slice(selectionEnd);
        this.setState({newFormula});
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
        const newVenn = new VennIllustrationData(currentVenn.setCount, currentVenn.width, newVennSets);

        this.setState({errorIndex: 0, errorMessage: ""});
        this.props.onDiagramRender(newVenn);
    }

    componentWillReceiveProps(nextProps) {
        const oldSetCount = this.props.vennIllustrationData.setCount;
        const newSetCount = nextProps.vennIllustrationData.setCount;

        if (oldSetCount !== newSetCount) {
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
                <VennFormula vennIllustrationData={vennIllustrationData} setFormulaText={setFormulaText}
                             onChange={this.handleTextChange} onDiagramRender={this.handleDiagramRender}/>
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
}

export default VennInterface;

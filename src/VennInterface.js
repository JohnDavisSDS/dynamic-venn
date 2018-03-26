import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennButtons from "./VennButtons";
import VennFormula from "./VennFormula";
import VennHelper from "./VennHelper";
import VennIllustrationData from "./VennIllustrationData";

class VennInterface extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleDiagramRender = this.handleDiagramRender.bind(this);
        this.state = {selectionStart: 0, selectionEnd: 0, setFormulaText: ""};
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

        const newVennSets = VennHelper.getSetsFromFormula(setFormula);
        const newVenn = new VennIllustrationData(currentVenn.setCount, currentVenn.width, newVennSets);

        this.props.onDiagramRender(newVenn);
    }

    render() {
        const setFormulaText = this.state.setFormulaText;
        const setCount = this.props.vennIllustrationData.setCount;

        return (
            <Box pad="small" colorIndex="light-1">
                <VennFormula setFormulaText={setFormulaText} onChange={this.handleTextChange} onDiagramRender={this.handleDiagramRender}/>
                <VennButtons setCount={setCount} onChange={this.handleButtonChange}/>
            </Box>
        );
    }
}

export default VennInterface;

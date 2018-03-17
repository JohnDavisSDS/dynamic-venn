import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennFormula from "./VennFormula";
import VennButtons from "./VennButtons";

class VennInterface extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
        this.state = {selectionStart: 0, selectionEnd: 0, setFormulaText: props.setFormula};
    }

    handleTextChange(selectionStart, selectionEnd, value) {
        this.setState({selectionStart, selectionEnd, setFormulaText: value});
    }

    handleButtonChange(char) {
        let setFormulaText = this.props.setFormula.slice(0, this.state.selectionStart) +
            char +
            this.props.setFormula.slice(this.state.selectionEnd);
        this.setState({setFormulaText});
    }

    handleFormulaChange() {
        this.props.onChange(this.state.setFormulaText);
    }

    render() {
        return (
            <Box pad="small" colorIndex="light-1">
                <VennFormula setFormula={this.props.setFormula} onChange={this.handleFormulaChange}/>
                <VennButtons setCount={this.props.setCount} onChange={this.handleButtonChange}/>
            </Box>
        );
    }
}

export default VennInterface;

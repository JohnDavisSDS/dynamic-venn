import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennDiagram from "./VennDiagram";
import VennInterface from "./VennInterface";

class VennContent extends Component {
    constructor(props) {
        super(props);
        this.handleSetFormulaChange = this.handleSetFormulaChange.bind(this);
        this.state = {setFormula: ""};
    }

    handleSetFormulaChange(formula) {
        this.setState({setFormula: formula});
    }

    render() {
        return (
            <Box pad="medium" colorIndex="neutral-1">
                <VennDiagram setCount={this.props.setCount} setFormula={this.state.setFormula}/>
                <VennInterface setCount={this.props.setCount} setFormula={this.state.setFormula} onChange={this.handleSetFormulaChange}/>
            </Box>
        );
    }
}

export default VennContent;

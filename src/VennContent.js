import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennDiagram from "./VennDiagram";
import VennIllustrationData from "./VennIllustrationData";
import VennInterface from "./VennInterface";

class VennContent extends Component {
    constructor(props) {
        super(props);
        this.handleDiagramRender = this.handleDiagramRender.bind(this);

        const setCount = this.props.setCount;
        const width = this.props.width;

        this.state = {
            vennIllustrationData: new VennIllustrationData(setCount, width, [], "")
        };
    }

    componentWillReceiveProps(nextProps) {
        const setCount = nextProps.setCount;
        const width = nextProps.width;

        if (setCount !== this.props.setCount) {
            this.setState({vennIllustrationData: new VennIllustrationData(setCount, width, [], "")});
        }
        else if (width !== this.props.width) {
            const vennSections = this.state.vennIllustrationData.vennSections;
            const setFormulaTest = this.state.vennIllustrationData.setFormulaTest;
            this.setState({vennIllustrationData: new VennIllustrationData(setCount, width, vennSections, setFormulaTest)});
        }
    }

    handleDiagramRender(vennIllustrationData) {
        this.setState({vennIllustrationData: vennIllustrationData});
    }

    render() {
        const vennIllustrationData = this.state.vennIllustrationData;

        return (
            <Box pad="medium" colorIndex="neutral-1">
                <VennDiagram vennIllustrationData={vennIllustrationData}/>
                <VennInterface vennIllustrationData={vennIllustrationData} onDiagramRender={this.handleDiagramRender}/>
            </Box>
        );
    }
}

export default VennContent;

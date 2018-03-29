import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import VennIllustrator from "./VennIllustrator";

class VennDiagram extends Component {
    render() {
        const vennIllustrationData = this.props.vennIllustrationData;
        const width = vennIllustrationData.width;
        const setFormulaText = vennIllustrationData.setFormulaTest;

        return (
            <Box pad="small" colorIndex="light-1" align="center" alignContent="center" justify="center">
                <Header><Title>{setFormulaText}</Title></Header>
                <canvas id="vennDiagramCanvas" width={width} height={width}>
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </Box>
        );
    }

    componentDidMount() {
        this.drawDiagram();
    }

    componentDidUpdate() {
        this.drawDiagram();
    }

    drawDiagram() {
        const vennIllustrationData = this.props.vennIllustrationData;

        const canvas = document.getElementById("vennDiagramCanvas");
        const canvasContext = canvas.getContext("2d");
        const vennIllustrator = new VennIllustrator(canvasContext, vennIllustrationData);

        vennIllustrator.draw();
    }
}

export default VennDiagram;

import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennHelper from "./VennHelper";
import VennIllustrator from "./VennIllustrator";

class VennDiagram extends Component {
    render() {
        const vennIllustrationData = this.props.vennIllustrationData;
        const width = vennIllustrationData.width;

        return (
            <Box pad="small" colorIndex="light-1" align="center" alignContent="center" justify="center">
                <canvas id="vennDiagramCanvas" width={width} height={width}>
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </Box>
        );
    }

    componentDidMount() {
        const vennIllustrationData = this.props.vennIllustrationData;
        const setCount = vennIllustrationData.setCount;

        let universalSet = VennHelper.getAllVennSectionNames(setCount);
        let sets = [
            new Set(),
            new Set(),
            new Set(),
        ];
        universalSet.forEach(function(setName) {
            let vennSection = VennHelper.getVennSection(setCount, setName);
            vennSection.supersetIndexes.forEach(function(setIndex) {
                sets[setIndex].add(setName);
            });
        });

        let testSetNames = new Set();
        testSetNames = testSetNames.union(sets[0]);
        testSetNames = testSetNames.intersection(sets[1]);

        let testSets = [];
        testSetNames.forEach(function(setName) {
            testSets.push(VennHelper.getVennSection(setCount, setName));
        });

        //const vennIllustrationData = new VennIllustrationData(setCount, 600, testSets);


        const canvas = document.getElementById("vennDiagramCanvas");
        const canvasContext = canvas.getContext("2d");
        const vennIllustrator = new VennIllustrator(canvasContext, vennIllustrationData);
        vennIllustrator.draw();
    }

    componentDidUpdate() {
        const vennIllustrationData = this.props.vennIllustrationData;


        const canvas = document.getElementById("vennDiagramCanvas");
        const canvasContext = canvas.getContext("2d");
        const vennIllustrator = new VennIllustrator(canvasContext, vennIllustrationData);
        vennIllustrator.draw();
    }

}

export default VennDiagram;

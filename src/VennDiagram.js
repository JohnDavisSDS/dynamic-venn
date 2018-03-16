import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import VennDiagram from "./VennDiagram";
import VennInterface from "./VennInterface";

class VennContent extends Component {

    render() {
        return (
            <Box pad="small" colorIndex="light-1">
                <canvas id="vennDiagramCanvas" width="800" height="800">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </Box>
        );
    }
}

export default VennContent;

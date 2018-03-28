import React, {Component} from 'react';
import ReactResizeDetector from 'react-resize-detector';
import VennContent from "./VennContent";
import VennFooter from "./VennFooter";
import VennHeader from "./VennHeader";
import VennHelper from "./VennHelper";
import App from 'grommet/components/App';
import './DynamicVenn.css';

class DynamicVenn extends Component {
    constructor(props) {
        super(props);
        this.handleSetCountChange = this.handleSetCountChange.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            setCount: parseInt(this.props.match.params.setCount, 10),
            width: VennHelper.MIN_WIDTH
        };
    }

    handleSetCountChange(setCount) {
        this.setState({setCount});
    }

    handleResize(width) {
        let element = document.getElementById("vennDiagramCanvas");
        let availableWidth = width;
        while (element.id !== "dynamicVennAppContainer") {
            availableWidth -= this.getPaddingInPixels(element);
            element = element.parentElement;
        }

        const expectedWidth = VennHelper.expectedWidth(availableWidth);
        if (expectedWidth !== this.state.width)
            this.setState({width: expectedWidth});
    }

    getPaddingInPixels(element) {
        const elementStyle = window.getComputedStyle(element);
        let paddingPixels = 0;

        if (elementStyle.hasOwnProperty("padding-left")) {
            const pixelCount = parseInt(elementStyle["padding-left"].match("\\d+")[0], 10);
            if (typeof(pixelCount) === "number")
                paddingPixels += pixelCount;
        }

        if (elementStyle.hasOwnProperty("padding-right")) {
            const pixelCount = parseInt(elementStyle["padding-right"].match("\\d+")[0], 10);
            if (typeof(pixelCount) === "number")
                paddingPixels += pixelCount;
        }

        return paddingPixels;
    }

    render() {
        const setCount = this.state.setCount;
        const width = this.state.width;

        return (
            <App id="dynamicVennAppContainer">
                <ReactResizeDetector handleWidth={true} onResize={this.handleResize}/>
                <VennHeader setCount={setCount} onChange={this.handleSetCountChange}/>
                <VennContent setCount={setCount} width={width}/>
                <VennFooter/>
            </App>
        );
    }
}

export default DynamicVenn;

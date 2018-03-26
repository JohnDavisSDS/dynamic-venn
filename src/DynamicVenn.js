import React, {Component} from 'react';
import ReactResizeDetector from 'react-resize-detector';
import VennContent from "./VennContent";
import VennHeader from "./VennHeader";
import VennHelper from "./VennHelper";
import App from 'grommet/components/App';

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
        const expectedWidth = VennHelper.expectedWidth(width);
        if (expectedWidth !== this.state.width)
            this.setState({width: expectedWidth});
    }

    render() {
        const setCount = this.state.setCount;
        const width = this.state.width;

        return (
            <App>
                <ReactResizeDetector handleWidth={true} onResize={this.handleResize}/>
                <VennHeader setCount={setCount} onChange={this.handleSetCountChange}/>
                <VennContent setCount={setCount} width={width}/>
            </App>
        );
    }
}

export default DynamicVenn;

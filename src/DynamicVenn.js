import React, {Component} from 'react';
import VennHeader from "./VennHeader";

class DynamicVenn extends Component {
    constructor(props) {
        super(props);
        this.handleSetCountChange = this.handleSetCountChange.bind(this);
        this.state = {setCount: this.props.match.params.setCount};
    }

    handleSetCountChange(setCount) {
        this.setState({setCount});
    }

    render() {
        const setCount = this.state.setCount;
        return (
            <div>
                <VennHeader setCount={setCount} onChange={this.handleSetCountChange}/>
                {"Placeholder: " + setCount}
            </div>
        );
    }
}

export default DynamicVenn;

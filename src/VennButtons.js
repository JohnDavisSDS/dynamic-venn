import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import VennHelper from './VennHelper';

class VennButtons extends Component {
    setButtons() {
        const setCount = this.props.vennIllustrationData.setCount;
        let buttons = [];

        const sChange = () => {
            this.props.onChange("S")
        };
        buttons.push(<Button label='S' onClick={sChange} key="S"/>);
        for (let i = 0; i < setCount; i++) {
            const setChar = VennHelper.getSetCharFromIndex(i);
            const handleChange = () => {
                this.props.onChange(setChar)
            };
            buttons.push(<Button label={setChar} onClick={handleChange} key={setChar}/>);
        }

        return buttons;
    }

    OperatorButton(char) {
        const handleChange = () => {
            this.props.onChange(char)
        };
        return <Button label={char} onClick={handleChange} secondary={true}/>;
    }

    tertiaryButton(char) {
        let changeChar = char;
        if (char === VennHelper.UNDER_BRACKET)
            changeChar = " ";
        const handleChange = () => {
            this.props.onChange(changeChar)
        };
        return <Button label={char} onClick={handleChange} accent={true}/>;
    }

    render() {
        return (
            <Box pad="small" colorIndex="light-1">
                <div className="calcButtons">
                    <Box justify="center" direction="row" pad={{between: "small", vertical: "small"}}
                         responsive={false}>
                        {this.setButtons()}
                    </Box>
                    <Box justify="center" direction="row" pad={{between: "small", vertical: "small"}}
                         responsive={false}>
                        {this.OperatorButton(VennHelper.UNION_CHAR)}
                        {this.OperatorButton(VennHelper.INTERSECTION_CHAR)}
                        {this.OperatorButton("-")}
                        {this.OperatorButton(VennHelper.COMPLEMENT_CHAR)}
                    </Box>
                    <Box justify="center" direction="row" pad={{between: "small", vertical: "small"}}
                         responsive={false}>
                        {this.tertiaryButton("(")}
                        {this.tertiaryButton(")")}
                        {this.tertiaryButton(VennHelper.UNDER_BRACKET)}
                        {this.tertiaryButton("BS")}
                    </Box>
                </div>
            </Box>
        );
    }
}

export default VennButtons;
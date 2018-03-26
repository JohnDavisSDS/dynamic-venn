import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Columns from 'grommet/components/Columns';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import VennHelper from "./VennHelper";

const helpString = "u = " + VennHelper.UNION_CHAR +
    "; i = " + VennHelper.INTERSECTION_CHAR +
    "; ' = " + VennHelper.COMPLEMENT_CHAR;

const defaultCharMap = {
    "u": VennHelper.UNION_CHAR,
    "U": VennHelper.UNION_CHAR,
    "i": VennHelper.INTERSECTION_CHAR,
    "I": VennHelper.INTERSECTION_CHAR,
    "'": VennHelper.COMPLEMENT_CHAR,
    "-": "-",
    "(": "(",
    ")": ")",
    " ": " ",
    "s": "S",
    "S": "S"
};

class VennFormula extends Component {
    constructor(props) {
        super(props);
        this.handleFormulaInputChange = this.handleFormulaInputChange.bind(this);
        this.charMap = {};
    }

    handleFormulaInputChange(event) {
        const selectionStart = event.target.selectionStart;
        const selectionEnd = event.target.selectionEnd;
        let setFormulaText = event.target.value;
        if (setFormulaText.length > 0) {
            const newChar = setFormulaText.substr(selectionStart - 1, 1);
            let replacementChar = "";
            if (this.charMap.hasOwnProperty(newChar)) {
                replacementChar = this.charMap[newChar];
            }

            setFormulaText = setFormulaText.slice(0, selectionStart - 1) +
                replacementChar +
                setFormulaText.slice(selectionStart);
        }

        this.props.onChange(selectionStart, selectionEnd, setFormulaText);
    }

    updateCharMap() {
        this.charMap = Object.assign({}, defaultCharMap);
        const vennIllustrationData = this.props.vennIllustrationData;

        for (let i = 0; i < vennIllustrationData.setCount; i++) {
            const setChar = VennHelper.getSetCharFromIndex(i);
            this.charMap[setChar] = setChar;
            this.charMap[setChar.toLowerCase()] = setChar;
        }
    }

    componentWillMount() {
        this.updateCharMap();
    }

    componentWillUpdate() {
        this.updateCharMap();
    }

    render() {
        const setFormulaText = this.props.setFormulaText;

        return (
            <Columns justify="center">
                <Box margin="small">
                    <Form>
                        <FormField label="Formula" help={helpString}>
                            <TextInput onDOMChange={this.handleFormulaInputChange} value={setFormulaText}/>
                        </FormField>
                    </Form>
                </Box>
                <Box margin="small">
                    <Button label='Render'
                            onClick={this.props.onDiagramRender}
                            href='#'
                            primary={true}/>
                </Box>
            </Columns>
        );
    }
}

export default VennFormula;
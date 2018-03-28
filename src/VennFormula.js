import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import VennHelper from "./VennHelper";

const helpString = "u = " + VennHelper.UNION_CHAR +
    "; i = " + VennHelper.INTERSECTION_CHAR +
    "; ' = " + VennHelper.COMPLEMENT_CHAR;

class VennFormula extends Component {
    render() {
        const setFormulaText = this.props.setFormulaText;

        return (
            <Box margin="small" justify="center" direction="row">
                <Form>
                    <FormField label="Formula" help={helpString}>
                        <TextInput
                            onDOMChange={this.props.onChange}
                            onPaste={this.props.onPaste}
                            onClick={this.props.onSelectionChange}
                            onKeyUp={this.props.onSelectionChange}
                            value={setFormulaText}
                            id="setFormulaTextInput"
                        />
                    </FormField>
                </Form>
                <Button label='Render'
                        onClick={this.props.onDiagramRender}
                        primary={true}/>
            </Box>
        );
    }
}

export default VennFormula;
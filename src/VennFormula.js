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

class VennFormula extends Component {
    constructor(props) {
        super(props);
        this.handleFormulaInputChange = this.handleFormulaInputChange.bind(this);
    }

    handleFormulaInputChange(event) {
        console.log(event);
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
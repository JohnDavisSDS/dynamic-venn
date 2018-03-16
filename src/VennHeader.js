import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Select from 'grommet/components/Select';
import Title from 'grommet/components/Title';

class VennHeader extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(parseInt(e.value.substring(0, 1), 10));
    }

    render() {
        const setCount = this.props.setCount;
        const selectedValue = setCount + " Sets";
        return (
            <Box pad="medium" colorIndex="grey-4">
                <Header>
                    <Title>
                        Dynamic Venn
                    </Title>
                    <Box flex={true}
                         justify='end'
                         direction='row'
                         responsive={false}>
                        <Box colorIndex="light-2">
                            <Select options={['2 Sets', '3 Sets']}
                                    value={selectedValue}
                                    onChange={this.handleChange}/>
                        </Box>
                    </Box>
                </Header>
            </Box>
        );
    }
}

export default VennHeader;

import React, {Component} from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';

class VennFooter extends Component {
    render() {
        return (
            <Footer justify='between'>
                <Title>
                    <s />
                    Reckless Alchemy
                </Title>
                <Box direction='row'
                     align='center'
                     pad={{"between": "medium"}}>
                    <Menu direction='row'
                          size='small'
                          dropAlign={{"right": "right"}}>
                        <Anchor href='https://github.com/JohnDavisSDS/dynamic-venn'>
                            Source
                        </Anchor>
                    </Menu>
                </Box>
            </Footer>
        );
    }
}

export default VennFooter;

import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import {Link} from 'react-router-dom';

class RouteNotFound extends Component {
    render() {
        return (
            <Box pad="large">
                <Notification message="404 - Page not found" status="warning"/>
                <Paragraph>
                    <Label>{this.props.location.pathname}</Label><br/>
                    We could not find the above page.  Try the <Link to="/">Main Page</Link>.
                </Paragraph>
            </Box>
        );
    }
}

export default RouteNotFound;

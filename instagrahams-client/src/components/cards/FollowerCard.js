import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class FollowerCard extends React.Component {

    render() {
        return (
            <div>
            <Card className="follow-div-card">
                <Image src={this.props.data.avatar}  wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{this.props.data.username}</Card.Header>
                    <Card.Meta>
                    </Card.Meta>
                </Card.Content>
            </Card>
            </div>

        )
    }
}

export default FollowerCard;
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class MyCard extends Component {
  render() {
    const { name, facedown } = this.props;
    return (
      <div className="card-container">
        <Card>
          <CardContent>
            {facedown ? (
              <Typography>?</Typography>
            ) : (
              <Typography>{name}</Typography>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default MyCard;

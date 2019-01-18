import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 100,
    height: 120,
  },
};

class MyCard extends Component {
  render() {
    const { name, facedown, classes } = this.props;
    return (
      <div className="card-container">
        <Card className={classes.card}>
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

export default withStyles(styles)(MyCard);

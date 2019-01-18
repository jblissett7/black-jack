import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Hand extends Component {
  render() {
    const { cards, count, name } = this.props;
    return (
      <div>
        <Grid container spacing={8} justify="center">
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h5">{name}</Typography>
            </Grid>
          </Grid>
          {cards.map((card, index) => (
            <Grid item>
              <MyCard
                name={card.card.name}
                key={index}
                facedown={card.facedown}
              />
            </Grid>
          ))}
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h5">{count}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Hand;

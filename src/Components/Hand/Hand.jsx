import React, { Component } from 'react';
import MyCard from '../MyCard/MyCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Hand extends Component {
  render() {
    const { cards, count, name } = this.props;
    return (
      <div>
        <Grid container justify="center" spacing={8}>
          <Grid container item justify="center">
            <Typography variant="h5">{name}</Typography>
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
          <Grid container item justify="center">
            <Typography variant="h5">Score: {count}</Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Hand;

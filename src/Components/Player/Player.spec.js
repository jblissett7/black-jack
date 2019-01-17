import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';
import MyCard from './../MyCard/MyCard';

describe('Player', () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = shallow(
        <Player
          cards={[
            { card: { name: 'Ace of Clubs', value: 1 }, facedown: false },
            { card: { name: '3 of Clubs', value: 3 }, facedown: false },
          ]}
          count={20}
        />
      ))
  );

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render at least one <Card />', () => {
    expect(wrapper.containsMatchingElement(<MyCard />)).toEqual(true);
  });
});

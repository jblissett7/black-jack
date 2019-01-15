import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';
import Card from './../Card/Card';

describe('Player', () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = shallow(
        <Player
          cards={[
            { name: 'Jack of Diamonds', value: 10 },
            { name: 'Queen of Hearts', value: 10 },
          ]}
          count={20}
        />
      ))
  );

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render at least one <Card />', () => {
    expect(wrapper.containsMatchingElement(<Card />)).toEqual(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Dealer from './Dealer';
import MyCard from './../MyCard/MyCard';

describe('Dealer', () => {
  let wrapper;
  beforeEach(
    () =>
      (wrapper = shallow(
        <Dealer
          cards={[
            { card: { name: 'Ace of Clubs', value: 1 }, facedown: false },
            { card: { name: '3 of Clubs', value: 3 }, facedown: false },
          ]}
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

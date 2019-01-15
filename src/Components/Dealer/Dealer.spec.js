import React from 'react';
import { shallow } from 'enzyme';
import Dealer from './Dealer';
import Card from './../Card/Card';

describe('Dealer', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Dealer cards={['Ace of Clubs']} />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render at least one <Card />', () => {
    expect(wrapper.containsMatchingElement(<Card />)).toEqual(true);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import BlackJack from './../BlackJack/BlackJack';

describe('App', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render the BlackJack Component', () => {
    expect(wrapper.containsMatchingElement(<BlackJack />)).toEqual(true);
  });
});

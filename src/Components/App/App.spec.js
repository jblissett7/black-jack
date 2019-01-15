import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import BlackJackContainer from '../../Containers/BlackJack/BlackJackContainer';

describe('App', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render the BlackJackContainer Component', () => {
    expect(wrapper.containsMatchingElement(<BlackJackContainer />)).toEqual(
      true
    );
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import GameContainer from '../../Containers/Game/GameContainer';

describe('App', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<App />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('Should render the GameContainer Component', () => {
    expect(wrapper.containsMatchingElement(<GameContainer />)).toEqual(true);
  });
});

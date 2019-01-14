import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';

describe('Player', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Player />)));

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});

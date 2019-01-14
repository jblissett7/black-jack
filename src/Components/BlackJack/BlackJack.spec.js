import React from 'react';
import { shallow } from 'enzyme';
import BlackJack from './BlackJack';

describe('BlackJack', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<BlackJack />)));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});

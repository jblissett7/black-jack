import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import StartContainer from './StartContainer';

describe('StartContainer', () => {
  let wrapper, shallow;
  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<StartContainer />);
  });

  it('Should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import AppSpinner from '../components/shared/Spinner';
import { Backdrop, CircularProgress } from '@material-ui/core';

describe('AppSpinner ', () => {
    let wrapper: any;
    let props = { showSpinner: true };
    const useStateSpy = jest.spyOn(React, 'useState');
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    beforeEach(() => {
        wrapper = shallow(<AppSpinner {...props}/>);
    });
    
    it('renders with all required child components', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(CircularProgress).length).toBe(1);
        expect(wrapper.find(Backdrop).length).toBe(1);
    });

    it('updates state to show/hide', () => {
        wrapper.update();
        expect(wrapper.find(Backdrop).props().open).toBe(true);
        props.showSpinner = false;
        wrapper = shallow(<AppSpinner {...props} />);
        wrapper.update();
        expect(useStateSpy).toHaveBeenCalled();
        expect(useEffectSpy).toHaveBeenCalled();
        expect(wrapper.find(Backdrop).props().open).toBe(false);
    });
});
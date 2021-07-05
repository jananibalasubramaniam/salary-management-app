import React from 'react';
import { shallow } from 'enzyme';
import DragDrop from '../components/shared/DragDrop';
import AppSpinner from '../components/shared/Spinner';
import StatusMessageDialog from '../components/shared/StatusMessage';

describe('DragDrop', () => {
    let wrapper: any;
    const props = {
        clearState: true,
        uploadFiles: false,
        uploadComplete: jest.fn(() => {})
    };

    beforeEach(() => {
        wrapper = shallow(<DragDrop {...props}/>);
    });

    it('renders self and children', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(AppSpinner).length).toBe(1);
        expect(wrapper.find(StatusMessageDialog).length).toBe(1);
    });

});
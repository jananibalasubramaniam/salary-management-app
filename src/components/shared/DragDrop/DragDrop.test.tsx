import React from 'react';
import { shallow } from 'enzyme';
import DragDrop from './DragDrop';
import AppSpinner from '../Spinner/Spinner';
import StatusMessageDialog from '../StatusMessage/StatusMessage';

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
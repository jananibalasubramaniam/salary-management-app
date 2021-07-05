import React from 'react';
import { mount , shallow }  from 'enzyme';
import UploadEmployees from './UploadEmployees';
import DragDrop from '../shared/DragDrop/DragDrop';
import { act } from 'react-dom/test-utils';

describe('UploadEmployees', () => {
    let wrapper: any;
    const props = {
        openUpload: true,
        closeView: jest.fn(),
    };
    const useStateSpy = jest.spyOn(React, 'useState');

    beforeEach(() => {
        wrapper = shallow(<UploadEmployees {...props}/>);
    });

    it('renders itself and children ', () => {
        expect(wrapper).toBeTruthy();
        expect(wrapper.find(DragDrop).length).toBe(1);
    });
    
    it('sets state when uploadbutton is clicked', () => {
        let uploadButton = wrapper.find('#upload-employees');

        act(() => {
            uploadButton.props().onClick();
            wrapper.update();
        })
        expect(useStateSpy).toHaveBeenCalled();
    });

    it('calls parent function when close button is clicked', () => {
        let closeButton = wrapper.find('#upload-close');

        closeButton.props().onClick();
        wrapper.update();
        expect(props.closeView).toHaveBeenCalledTimes(1);
    });
})
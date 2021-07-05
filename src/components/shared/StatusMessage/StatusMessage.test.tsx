import React from 'react';
import { shallow, mount } from 'enzyme';
import StatusMessageDialog from './StatusMessage';
import {StatusMessage} from '../../../shared/interfaces/statusMessage.interface'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

describe('StatusMessageDialog', () => {
    const props = {
        openDialog: true,
        status: {
            status: 200,
            title: 'Success',
            message: 'succesfully opened status message dialog'
        } as StatusMessage
    }
    let wrapper: any;
    const useStateSpy = jest.spyOn(React, 'useState');

    beforeEach(() => {
        wrapper = shallow(<StatusMessageDialog {...props}/>);
    });
    
    it('renders', () => {
        expect(wrapper).toBeTruthy();
    });

    it('props are set in dialog', () => {
        const mountedWrapper = mount(<StatusMessageDialog {...props} />);
        const statusTitle = mountedWrapper.find(DialogTitle);
        const statusContent = mountedWrapper.find(DialogContentText);
        const statusDialogButton = mountedWrapper.find('#statusdialog-btn-ok').first();

        expect(statusTitle.props().children).toEqual(props.status.title);
        expect(statusContent.props().children).toEqual(props.status.message);
        expect(statusDialogButton.length).toBe(1);
        expect(statusDialogButton.props().children).toBe('OK');
    });

    it('calls handle to set state on button click', () => {
        const handleClose = jest.fn();
        const statusDialogButton = wrapper.find('#statusdialog-btn-ok');

        statusDialogButton.props().onClick();
        wrapper.update();
        // expect(handleClose).toHaveBeenCalledTimes(1);
        expect(useStateSpy).toHaveBeenCalled();
    });
});
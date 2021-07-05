import React from 'react';
import { shallow }  from 'enzyme';
import './NavMenu';
import NavMenu from './NavMenu';
import UploadEmployees from '../BulkUploadEmployees/UploadEmployees';
import MenuIcon from '@material-ui/icons/Menu';

describe('NavMenu', () =>{
    let wrapper: any;

    beforeEach(() => {
      wrapper = shallow(<NavMenu />);
    });
    
    it('renders', () => {
        expect(wrapper).toBeTruthy();
    });

    it('renders list for nav', () => {
        expect(wrapper.find('li').length).toEqual(2);
    });

    it('renders child component', () => {
        expect(wrapper.find(UploadEmployees).length).toEqual(1);
    });

    it('openMenu is false; hamburger menu is hidden', () => {
        expect(wrapper.openUpload).toBeFalsy();
        expect(wrapper.find(MenuIcon).length).toEqual(1);
    });

    it('sets state to open upload menu on click', () =>{
        expect(wrapper.find(UploadEmployees).prop('openUpload')).toBeFalsy();
        wrapper.find('li').first().simulate('click', 1);
        expect(wrapper.find(UploadEmployees).prop('openUpload')).toBeTruthy();
    })
});

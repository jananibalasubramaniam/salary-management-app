import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import UploadEmployees from '../BulkUploadEmployees/UploadEmployees';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    navcontainer: {
        fontSize: '18px',
        backgroundColor: '#959595',
        width: '20%',
        height: '105vh',
        color: '#fff',
        float: 'left',

        '@media only screen and (max-width: 768px)': {
            width: '100vw',
            maxHeight: '7vh'
        }
    },
    unorderedlist: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    
        '@media only screen and (max-width: 768px)': {
            display: 'none'
        }
    },
    unorderedlistopen: {
        '@media only screen and (max-width: 768px)': {
            display: 'inline-block',
            position: 'fixed',
            top: '45px',
            left: 0,
            width: '100%',
            backgroundColor: '#f5f5f5',
            color: '#000',
            zIndex: 2,

            '&:active': {
                backgroundColor: '#555',
                color: '#fff'
            }
        }
    },
    navlist: {
        cursor: 'pointer',
        padding: '15px',
        flex: 'auto',
        textAlign: 'center',

        '&:hover': {
            backgroundColor: '#555',
            color: '#fff'
        },

        '@media only screen and (max-width: 768px)': {
            textAlign: 'left',
            paddingright: '15px',
            fontSize: '16px',
            width: '100%'
        }
    },
    userinfo: {
        height: '50%',
        textAlign: 'center'
    },
    usericon: {
        backgroundColor: '#555',
        borderRadius: '50%',
        width: '65px',
        height: '65px',
        marginTop: '50%',
        color: '#f5f5f5',
        padding: '10px',

        '@media only screen and (max-width: 768px)': {
            float: 'left',
            width: '25px',
            height: '25px',
            margin: '4% 0 1% 3%',
            padding: '5px'
        }
    },
    username: {
        padding: '10px',

        '@media only screen and (max-width: 768px)': {
            display: 'none'
        }
    },
    hamburger: {
        display: 'none',

        '@media only screen and (max-width: 768px)': {
            display: 'block',
            cursor: 'pointer',
            position: 'fixed',
            top: '10px',
            right: '10px'
        }
    },
    bar: {
        display: 'block',
        width: '25px',
        height: '3px',
        margin: '5px auto',
        webkitTransition: 'all 0.3s ease-in-out',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'black'
    },
    iconstyle: {
        verticalAlign: 'top',
        height: '20px'
    }
}));

const NavMenu = () => {
    const classes = useStyles();
    const [openUpload, setOpenUpload] = useState<boolean>(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const openUploadEmployees = () => {
        setOpenUpload(true);
    }

    const closeUploadEmployees = () => {
        setOpenUpload(false);
    }

    const openHamburgerMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <Fragment>
            <nav className={classes.navcontainer}>
                <div className={classes.userinfo}>
                    <PersonIcon className={classes.usericon}/>
                    <p className={classes.username}>HR Admin User</p>
                </div>
                <div className={classes.hamburger} onClick={openHamburgerMenu}>
                    {!openMenu && (
                        <MenuIcon />
                    )}
                    {openMenu && (<CloseIcon />)}
                </div>
                <ul className={`${classes.unorderedlist} ${openMenu ? classes.unorderedlistopen:''}`}>
                    <li className={classes.navlist} onClick={openUploadEmployees}> 
                        <PublishIcon className={classes.iconstyle} />
                        <span> UPLOAD </span> 
                    </li>
                    <li  className={classes.navlist}> 
                        <InfoIcon className={classes.iconstyle} />    
                        <span> ABOUT </span>
                        <span hidden> placeholder to open NPHC home </span>
                    </li>
                </ul>
            </nav>
            <UploadEmployees openUpload={openUpload} closeView={closeUploadEmployees} />
        </Fragment>
    )
}

export default NavMenu;
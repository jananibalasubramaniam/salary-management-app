import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import InfoIcon from '@material-ui/icons/Info';
import UploadEmployees from './UploadEmployees';

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
            height: 'auto'
        }
    },
    unorderedlist: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    
        '@media only screen and (max-width: 768px)': {
            flexDirection: 'row'
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
            textAlign: 'right',
            paddingright: '15px',
            fontSize: '16px'
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
            margin: '3% 0 0 5%',
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
            cursor: 'pointer'
        }
    },
    bar: {
        display: 'block',
        width: '25px',
        height: '3px',
        margin: '5px auto',
        webkitTransition: 'all 0.3s ease-in-out',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#555'
    }
}));

const NavMenu = () => {
    const classes = useStyles();
    const [openUpload, setOpenUpload] = useState<boolean>(false);

    const openUploadEmployees = () => {
        setOpenUpload(true);
    }

    const closeUploadEmployees = () => {
        setOpenUpload(false);
    }

    // use dehaze icon or list icon /menu and menuopen toggle
    return (
        <Fragment>
            <nav className={classes.navcontainer}>
                <div className={classes.userinfo}>
                    <PersonIcon className={classes.usericon}/>
                    <p className={classes.username}>HR Admin User</p>
                </div>
                <ul className={classes.unorderedlist}>
                    <li className={classes.navlist} onClick={openUploadEmployees}> 
                        <PublishIcon/>
                        <span> UPLOAD </span> 
                    </li>
                    <li hidden className={classes.navlist}> 
                        <InfoIcon/>    
                        <span> ABOUT </span>
                    </li>
                </ul>
            </nav>
            <div className={classes.hamburger}>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
                <span className={classes.bar}></span>
            </div>
            <UploadEmployees openUpload={openUpload} closeView={closeUploadEmployees} />
        </Fragment>
    )
}

export default NavMenu;
import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    imagecontainer: {
        maxHeight: '300px',
        width: '300px',
        margin: '3px',
        padding: '3px',
        float: 'left'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',

        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200
        },

        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiInput-underline': {
            '&::after': {
                borderBottom: '2px solid rgba(0, 0, 0, 0.42) !important'
            }
        }
    },
    buttonStyle: {
        backgroundColor: '#555',
        color: '#ffffff',
        marginBottom: '10px',

        '&:hover': {
            backgroundColor: '#959595',
            color: '#000'
        }
    }
}));

const UploadEmployees :FC<{
    openUpload: boolean;
    closeView: Function;
}> = ({
    openUpload,
    closeView
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(openUpload);

    useEffect(() => {
        setOpen(openUpload);
    });

    const closeUpload = () => {
        closeView();
        setOpen(false);
    };
    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete='off'>
                        <Button variant='contained' className={classes.buttonStyle} disableElevation onClick={() => console.log('upload handler invoked')}>
                            BROWSE
                        </Button>
                        <Button variant='contained' className={classes.buttonStyle} disableElevation onClick={() => console.log('close handler invoked')}>
                            CLOSE
                        </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default UploadEmployees;
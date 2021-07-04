import React, { useState, useEffect, FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { StatusMessage } from '../shared/interfaces/statusMessage.interface';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(() => ({
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


const StatusMessageDialog: FC<{
    openDialog: boolean;
    status: StatusMessage
}> = ({
    openDialog,
    status
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(openDialog);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(openDialog);
    }, [openDialog]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{status.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {status.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} className={classes.buttonStyle} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StatusMessageDialog;
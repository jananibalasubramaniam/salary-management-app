import React, { FC, useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';
import AppSpinner from '../Spinner/Spinner';
import { StatusMessage } from '../../../shared/interfaces/statusMessage.interface';
import StatusMessageDialog from '../StatusMessage/StatusMessage';
interface DropFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    path: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}

const useStyles = makeStyles(() => ({
    filedropcontainer: {
        width: '50vw',
        height: '50vh',
        border: '2px dashed #959595',
        borderRadius: '10px',
        margin: '15px 0 30px 0',
        padding: '20px',
        transition: 'border .3s ease-in-out',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer'
    },
    errorindicator: {
        color: '#dc3545'
    },
    successindicator: {
        color: '#28a745'
    },
    filescontainer: {
        listStyle: 'none',
        marginLeft: 0,
        paddingLeft: 0,
        textOverflow: 'hidden',
        maxWidth: '50vw',
        maxHeight: '20vh',
        overflowY: 'scroll',
        fontSize: '15px'
    },
    tickIcon: {
        display: 'inline-flex',
        verticalAlign: 'middle',
        height: '18px',
        color: '#28a745'
    }
}))

const DragDrop: FC<{
    clearState: boolean,
    uploadFiles: boolean,
    uploadComplete: Function
}> = ({
    clearState,
    uploadFiles,
    uploadComplete
}) => {
    const classes = useStyles();
    const MAX_SIZE:number = 2e+6;
    const SUPPORTED_TYPES = '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values';
    const [ filesToUpload, setFilesToUpload ] = useState<Array<DropFile | File>>([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFilesToUpload([...filesToUpload, acceptedFiles[0]])
    }, []);
    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, fileRejections } = useDropzone({
        onDrop,
        accept: SUPPORTED_TYPES,
        minSize: 0,
        maxSize: MAX_SIZE,
        multiple: true
    });
    const isFileTooLarge = (fileRejections?.length  && fileRejections[0].file.size > MAX_SIZE) || null;
    const isInvalidFileType = (fileRejections?.length && fileRejections[0].errors[0].code === 'file-invalid-type') || null;
    const isFileUploaded = (acceptedFiles.length && !fileRejections.length) || null;
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessage>({} as StatusMessage);


    useEffect(() => {
        setFilesToUpload([...filesToUpload, acceptedFiles[0]])
    }, [acceptedFiles]);

    //empty out on close
    useEffect(() => {
        setFilesToUpload([]);
    }, [clearState]);

    //send files to server when user clicks upload
    useEffect(() => {
        if(uploadFiles) {
            const form = new FormData();
            
            setShowSpinner(true);
            const uploaders = filesToUpload.filter(Boolean).forEach((file: File | DropFile) => {
                form.append('file', file as File);
                //the library's maxFiles does not seem to be working. So as a workaround, send
                //files one by one(to make sure the request size doesnt get too large)
                axios.post('https://nphc-hr.free.beeceptor.com/employees/upload', form , {
                    onUploadProgress: () => {
                        console.log(' upload in progress ');
                        //[TBD] update progress % here 
                    }
                }).then(response => console.log(response?.data || response))
            });

            axios.all(filesToUpload).then(response => {
                uploadComplete();
                setShowSpinner(false);
                console.log('Successfully uploaded all files', response);
                setStatusMessage({
                    title: 'Success',
                    message: 'Employee details uploaded successfully.'
                })
                setShowStatusMessage(true);
            }).catch(error => {
                setShowSpinner(false);
                console.error('Error uploading employees ', error?.response || error);
                setStatusMessage({
                    title: 'Error',
                    message: 'Could not upload employee details. Please try again later.'
                })
                setShowStatusMessage(true);
            })
            setFilesToUpload([]);
        }
    }, [uploadFiles]);

    return (
        <div>
            <div>
                <div className={classes.filedropcontainer} {...getRootProps()}>
                    <input  {...getInputProps()} />
                    {!isDragActive && !isDragReject && `Click or drop a file (size < 2MB) to upload! \n `}
                    {isDragActive && 'Drop the file...'}
                    {!isDragActive && isDragReject && 'File not accepted. Sorry!'}
                    {isInvalidFileType && !isDragActive && (
                        <div className={classes.errorindicator}>
                            File Type not supported. Upload only csv files.
                        </div>
                    )} 
                    {isFileTooLarge && !isDragActive && (
                        <div className={classes.errorindicator}>
                            File is too large. Upload only files less than 2MB.
                        </div>
                    )}
                    {isFileUploaded && !isDragActive && (
                        <div className={classes.successindicator}>
                            File upload success!
                        </div> 
                    )}
                </div>

                <ul className={classes.filescontainer}>
                    {filesToUpload.length > 0 && filesToUpload.map(file => {
                        if(file) {
                            return (
                                <li className="list-group-item list-group-item-success" key={file?.name}>
                                    <DoneIcon className={classes.tickIcon}/> {file?.name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>      
            <AppSpinner showSpinner={showSpinner}/>
            <StatusMessageDialog openDialog={showStatusMessage} status={statusMessage} />
        </div>
    )
};

export default DragDrop;
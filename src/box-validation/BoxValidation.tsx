import React from 'react';
import {
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        margin: 'auto',
    },
    dialog: {
        padding: theme.spacing(16),
    },
    dialogTitle: {
        width: 400,
    },
    title: {
        fontSize: 72,
    },
}));

function BoxValidation() {
    const classes = useStyles();
    const [showFolderSelection, setFolderSelectionVisibility] = React.useState(
        true,
    );
    const [
        showAnnotationDirectoryInput,
        setAnnotationDirectoryInputVisibility,
    ] = React.useState(true);

    const imageDirectoryId = 'images-directory';
    const annotationDirectoryId = 'annotation-directory';
    const [imageDirectory, setImageDirectory] = React.useState('');
    const [annotationDirectory, setAnnotationDirectory] = React.useState('');
    const annocationDirectoryLabel = React.useMemo(() => {
        if (
            annotationDirectory !== '' ||
            showAnnotationDirectoryInput === true
        ) {
            return annotationDirectory;
        } else {
            return imageDirectory;
        }
    }, [imageDirectory, annotationDirectory]);

    let preventDialogOpen = false;
    const openDirectory = (inputId: string) => {
        if (!preventDialogOpen) {
            ipcRenderer.send('open-directory', { inputId });
            preventDialogOpen = true;
        }
    };

    ipcRenderer.on(
        'directory-opened',
        (
            _event,
            { filePaths, inputId }: { filePaths: string[]; inputId: string },
        ) => {
            if (filePaths.length > 0) {
                if (inputId === imageDirectoryId) {
                    setImageDirectory(filePaths[0]);
                } else {
                    setAnnotationDirectory(filePaths[0]);
                }
            }

            document.getElementById(inputId)?.blur();
            preventDialogOpen = false;
        },
    );

    const toggleAnnotationDirectory = (_event: any, checked: boolean) => {
        setAnnotationDirectoryInputVisibility(checked);

        let visibility = 'visible';
        if (!checked) {
            visibility = 'hidden';
        }

        document.getElementById(
            'annotation-directory-container',
        )!.style.visibility = visibility;
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <h1>Box Validation</h1>
            Image directory: {imageDirectory}
            <br />
            Annotation directory: {annocationDirectoryLabel}
            <Dialog
                open={showFolderSelection}
                onClose={() => setFolderSelectionVisibility(false)}
                maxWidth='lg'
                className={classes.dialog}
            >
                <DialogTitle id='form-dialog-title'>Select folder</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogTitle}>
                        Please select the folder with your images.
                    </DialogContentText>
                    <FormControl fullWidth>
                        <InputLabel htmlFor={imageDirectoryId}>
                            Image directory
                        </InputLabel>
                        <Input
                            id={imageDirectoryId}
                            onFocus={() => openDirectory(imageDirectoryId)}
                            value={imageDirectory}
                        />
                    </FormControl>
                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={toggleAnnotationDirectory} />
                        }
                        label='Use different annotations folder'
                    />

                    <FormControl
                        id='annotation-directory-container'
                        fullWidth
                        style={{ visibility: 'hidden' }}
                    >
                        <InputLabel htmlFor={annotationDirectoryId}>
                            Annotation directory
                        </InputLabel>
                        <Input
                            id={annotationDirectoryId}
                            onFocus={() => openDirectory(annotationDirectoryId)}
                            value={annotationDirectory}
                        />
                    </FormControl>

                    <Button onClick={() => setFolderSelectionVisibility(false)}>
                        Accept
                    </Button>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default BoxValidation;

import React, { Component } from 'react';
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
import { styled } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';


const BoxValidationContainer = styled(Container)({
    marginTop: 8 * 8,
    margin: 'auto',
});
const BoxValidationDialog = styled(Dialog)({
    padding: 8*16,
});
const BoxValidationDialogContentText = styled(DialogContentText)({
    width: 400,
})

type BoxValidationState = {
    showFolderSelectionDialog: boolean,
    showAnnotationDirectoryInput: boolean,
    preventDialogOpen: boolean,
    imageDirectory: string,
    annotationDirectory: string,
    annocationDirectoryLabel: string,
};

class BoxValidation extends Component<{}, BoxValidationState>
{
    private imageDirectoryId = 'images-directory';
    private annotationDirectoryId = 'annotation-directory';

    public constructor(props: any) {
        super(props);

        this.state = {
            showFolderSelectionDialog: true,
            showAnnotationDirectoryInput: false,
            preventDialogOpen: false,
            imageDirectory: '',
            annotationDirectory: '',
            annocationDirectoryLabel: '',
        };

        ipcRenderer.on(
            'directory-opened',
            (
                _event,
                { filePaths, inputId }: { filePaths: string[]; inputId: string },
            ) => {
                if (filePaths.length > 0) {
                    if (inputId === this.imageDirectoryId) {
                        this.setState({ imageDirectory: filePaths[0] });
                    } else {
                        this.setState({ annotationDirectory: filePaths[0] });
                    }
                }

                document.getElementById(inputId)?.blur();
                this.setState({ preventDialogOpen: false });
            },
        );
    }

    openDirectory(inputId: string) {
        if (!this.state.preventDialogOpen) {
            ipcRenderer.send('open-directory', { inputId });
            this.setState({ preventDialogOpen: true });
        }
    };

    toggleAnnotationDirectory(_event: any, checked: boolean) {
        this.setState({ showAnnotationDirectoryInput: checked });

        let visibility = 'visible';
        if (!checked) {
            visibility = 'hidden';
        }

        document.getElementById(
            'annotation-directory-container',
        )!.style.visibility = visibility;
    }

    render() {
        return (
            <BoxValidationContainer maxWidth='lg'>
                <div onClick={() => this.setState({ showFolderSelectionDialog: true })}>
                    <h1>Box Validation</h1>
                    Image directory: {this.state.imageDirectory}
                    <br />
                    Annotation directory: {this.state.annocationDirectoryLabel}
                </div>
                <BoxValidationDialog
                    open={this.state.showFolderSelectionDialog}
                    onClose={() => this.setState({ showFolderSelectionDialog: false })}
                    maxWidth='lg'
                >
                    <DialogTitle id='form-dialog-title'>Select folder</DialogTitle>
                    <DialogContent>
                        <BoxValidationDialogContentText>
                            Please select the folder with your images.
                        </BoxValidationDialogContentText>
                        <FormControl fullWidth>
                            <InputLabel htmlFor={this.imageDirectoryId}>
                                Image directory
                            </InputLabel>
                            <Input
                                id={this.imageDirectoryId}
                                onFocus={() => this.openDirectory(this.imageDirectoryId)}
                                value={this.state.imageDirectory}
                            />
                        </FormControl>
                        <br />
                        <FormControlLabel
                            control={
                                <Checkbox onChange={this.toggleAnnotationDirectory.bind(this)} />
                            }
                            label='Use different annotations folder'
                        />

                        <FormControl
                            id='annotation-directory-container'
                            fullWidth
                            style={{ visibility: 'hidden' }}
                        >
                            <InputLabel htmlFor={this.annotationDirectoryId}>
                                Annotation directory
                            </InputLabel>
                            <Input
                                id={this.annotationDirectoryId}
                                onFocus={() => this.openDirectory(this.annotationDirectoryId)}
                                value={this.state.annotationDirectory}
                            />
                        </FormControl>

                        <Button onClick={() => this.setState({ showFolderSelectionDialog: false })}>
                            Accept
                        </Button>
                    </DialogContent>
                </BoxValidationDialog>
            </BoxValidationContainer>
        );
    }
}

export default BoxValidation;

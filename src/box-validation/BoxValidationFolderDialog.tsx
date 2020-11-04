import React, { Component } from 'react';
import {
    Button,
    Checkbox,
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

const BoxValidationDialog = styled(Dialog)({
    padding: 8*16,
});
const BoxValidationDialogContentText = styled(DialogContentText)({
    width: 400,
})

type BoxValidationDialogProps = {
    show: boolean,
    onChangeVisibility: (show: boolean) => void,
    onSetDirectories: (imageDirectory: string, annotationDirectory: string) => void,
};
type BoxValidationDialogState = {
    showAnnotationDirectoryInput: boolean,
    preventDialogOpen: boolean,
    imageDirectory: string,
    annotationDirectory: string,
};

class BoxValidationFolderDialog extends Component<BoxValidationDialogProps, BoxValidationDialogState>
{
    private imageDirectoryId = 'images-directory';
    private annotationDirectoryId = 'annotation-directory';

    public constructor(props: any) {
        super(props);

        this.state = {
            showAnnotationDirectoryInput: false,
            preventDialogOpen: false,
            imageDirectory: '',
            annotationDirectory: '',
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
                this.updateDirectories();
            },
        );
    }

    updateDirectories() {
        if (this.state.showAnnotationDirectoryInput) {
            this.props.onSetDirectories(this.state.imageDirectory, this.state.annotationDirectory);
        } else {
            this.props.onSetDirectories(this.state.imageDirectory, this.state.imageDirectory);
        }
    }

    openDirectory(inputId: string) {
        if (!this.state.preventDialogOpen) {
            ipcRenderer.send('open-directory', { inputId });
            this.setState({ preventDialogOpen: true });
        }
    };

    toggleAnnotationDirectory(_event: any, checked: boolean) {
        this.setState({ showAnnotationDirectoryInput: checked }, this.updateDirectories.bind(this));

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
            <BoxValidationDialog
                open={this.props.show}
                onClose={() => this.props.onChangeVisibility(false)}
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

                    <Button onClick={() => this.props.onChangeVisibility(false)}>
                        Accept
                    </Button>
                </DialogContent>
            </BoxValidationDialog>
        );
    }
}

export default BoxValidationFolderDialog;

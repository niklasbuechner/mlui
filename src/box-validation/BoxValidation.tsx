import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import BoxValidationFolderDialog from './BoxValidationFolderDialog';

const BoxValidationContainer = styled(Container)({
    marginTop: 8 * 8,
    margin: 'auto',
});

type BoxValidationState = {
    showFolderSelectionDialog: boolean,
    showAnnotationDirectoryInput: boolean,
    preventDialogOpen: boolean,
    imageDirectory: string,
    annotationDirectory: string,
};

class BoxValidation extends Component<{}, BoxValidationState>
{
    public constructor(props: any) {
        super(props);

        this.state = {
            showFolderSelectionDialog: true,
            showAnnotationDirectoryInput: false,
            preventDialogOpen: false,
            imageDirectory: '',
            annotationDirectory: '',
        };
    }

    toggleDialogVisibility(show: boolean) {
        this.setState({ showFolderSelectionDialog: show });
    }

    setDirectories(imageDirectory: string, annotationDirectory: string) {
        this.setState({ imageDirectory, annotationDirectory });
    }

    render() {
        return (
            <BoxValidationContainer maxWidth='lg'>
                <div onClick={() => this.setState({ showFolderSelectionDialog: true })}>
                    <h1>Box Validation</h1>
                    Image directory: {this.state.imageDirectory}
                    <br />
                    Annotation directory: {this.state.annotationDirectory}
                </div>
                <BoxValidationFolderDialog
                    show={this.state.showFolderSelectionDialog}
                    onChangeVisibility={this.toggleDialogVisibility.bind(this)}
                    onSetDirectories={this.setDirectories.bind(this)}
                >
                </BoxValidationFolderDialog>
            </BoxValidationContainer>
        );
    }
}

export default BoxValidation;

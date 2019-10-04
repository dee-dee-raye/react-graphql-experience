import React, { Component } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './ImageUpload.scss';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType,
    FilePondPluginFileEncode, FilePondPluginImageTransform);

class ImageUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: this.props.file
        };
    }

    render() {
        return(
            <FilePond 
            ref={ref => this.pond = ref}
            labelIdle= {this.props.text}
            files={this.state.files}
            imageResizeTargetWidth={200}
            imageCropAspectRatio= {1}
            imagePreviewHeight= {170}
            acceptedFileTypes={['image/png', 'image/jpeg']}
            maxFiles={1}
            allowFileEncode={true}
            imageTransformOutputQuality={60}
            onupdatefiles={(fileItems) => {
                this.setState({files: fileItems});
                if(this.state.files.length > 0) {
                    this.props.onHandleImageUpload(fileItems[0].file);
                }
            }}>
            </FilePond>
        );
    }
}

export default ImageUpload;


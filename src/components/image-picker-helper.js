import ImageCropPicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';

/**
 * OpenImagePickerLibrary
 * It is used to choose image from native image picker library.
 */
const OpenImagePickerLibrary = async () => {
  const selectedDocument = await ImageCropPicker.openPicker({
    // width: width,
    // height: height,
    // compressImageMaxWidth: width,
    // compressImageMaxHeight: height,
    // compressImageQuality: Platform.OS === 'ios' ? 0.35 : 0.45,
    multiple: false,
    // mediaType: mediaType,
    // cropping: isCropping,
    // cropperCircleOverlay: isCropping,
    // cropperCancelText: 'Cancel',
    // cropperChooseText: 'Choose',
    mediaType: 'video',
    // compressVideoPreset: 'Passthrough',
  });
  console.log(
    'OpenImagePickerLibrary.selectedDocument : ' +
      JSON.stringify(selectedDocument),
  );
  if (selectedDocument && selectedDocument.path) {
    console.log(
      'OpenImagePickerLibrary.selectedDocument : ' +
        JSON.stringify(selectedDocument),
    );
    let documentPath =
      Platform.OS === 'android'
        ? selectedDocument.path
        : selectedDocument.path.includes('file://')
        ? selectedDocument.path
        : `file://${selectedDocument.path}`;
    return {
      documentPath: {uri: documentPath},
      documentName: selectedDocument.path.substring(
        selectedDocument.path.lastIndexOf('/') + 1,
      ),
      documentMimeType: selectedDocument.mime,
    };
  } else {
    return null;
  }
};

/**
 * OpenCamera
 * It is used to choose image from native image picker library.
 */
const OpenCamera = async (
  width = 400,
  height = 400,
  isCropping = true,
  mediaType = 'photo',
) => {
  try {
    const selectedDocument = await ImageCropPicker.openCamera({
      multiple: false,
      mediaType: 'video',
    });

    if (selectedDocument && selectedDocument.path) {
      console.log(
        'OpenCamera.selectedDocument : ' + JSON.stringify(selectedDocument),
      );
      let documentPath =
        Platform.OS === 'android'
          ? selectedDocument.path
          : selectedDocument.path.includes('file://')
          ? selectedDocument.path
          : `file://${selectedDocument.path}`;
      return {
        documentPath: {uri: documentPath},
        documentName: selectedDocument.path.substring(
          selectedDocument.path.lastIndexOf('/') + 1,
        ),
        documentMimeType: selectedDocument.mime,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log('ERROR: OpenCamera : ' + JSON.stringify(error));
    return null;
  }
};

export {OpenImagePickerLibrary, OpenCamera};

export const EMAIL_PATTERN =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const PHONE_PATTERN = /^[+]{0,1}380([0-9]{9})$/;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIN_IMAGE_DIMENSION = 70;

export function validateUploadedImage(
  file: File,
  onInvalidFileSize: () => void,
  onInvalidDimenstions: () => void,
  onImageValidated: (file: File) => void
) {
  const reader = new FileReader();

  if (file.size > MAX_FILE_SIZE) {
    onInvalidFileSize();
    return;
  }

  reader.readAsDataURL(file);

  // errorCallback();
  reader.addEventListener('loadend', (event) => {
    const testImage = new Image();
    const result = event.target?.result;

    if (result === null || result === undefined) {
      return;
    }

    const safeString =
      typeof result === 'string' ? result : new TextDecoder().decode(result);

    testImage.src = safeString;

    testImage.addEventListener('load', () => {
      if (
        testImage.width < MIN_IMAGE_DIMENSION ||
        testImage.height < MIN_IMAGE_DIMENSION
      ) {
        onInvalidDimenstions();
      } else {
        onImageValidated(file);
      }
    });
  });
}

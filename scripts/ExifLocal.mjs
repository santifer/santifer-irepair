import fs from 'fs';
import path from 'path';
import piexif from 'piexifjs';

/**
 * Add metadata to an image file.
 *
 * @param {string} imagePath - Path to the image file.
 * @param {string} description - Description to add to the image.
 */
const addMetadataToImage = (imagePath, description) => {
  const metadata = {
    description,
    location: {
      latitude: 37.38606546685261, // Fixed latitude
      longitude: -5.9858563749917355, // Fixed longitude
    },
  };

  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(imagePath).toLowerCase();

  if (!supportedExtensions.includes(ext)) {
    console.error(`Unsupported file format: ${ext}`);
    return;
  }

  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    let base64Image;

    if (ext === '.png' || ext === '.webp') {
      console.error(`EXIF metadata is natively supported only for JPEG files.`);
      return;
    }

    base64Image = imageBuffer.toString('binary');

    // Get existing EXIF data or create a new one
    const exifObj = piexif.load(base64Image);
    const gps = exifObj['GPS'] || {};

    console.log('Existing GPS data:', gps);

    // Add location metadata
    gps[piexif.GPSIFD.GPSLatitude] = convertToDMS(metadata.location.latitude);
    gps[piexif.GPSIFD.GPSLatitudeRef] =
      metadata.location.latitude >= 0 ? 'N' : 'S';
    gps[piexif.GPSIFD.GPSLongitude] = convertToDMS(metadata.location.longitude);
    gps[piexif.GPSIFD.GPSLongitudeRef] =
      metadata.location.longitude >= 0 ? 'E' : 'W';

    console.log('Updated GPS data:', gps);

    // Add description metadata to ImageDescription
    exifObj['0th'][piexif.ImageIFD.ImageDescription] = description;

    // Add description metadata in EXIF-compatible Unicode format (UCS-2)
    const userCommentPrefix = 'UNICODE\0\0\0';
    const userCommentText = encodeUCS2(description); // Encode manually to UCS-2
    const userComment = Buffer.concat([
      Buffer.from(userCommentPrefix, 'ascii'),
      userCommentText,
    ]);
    console.log('UserComment bytes:', userComment);

    exifObj['Exif'][piexif.ExifIFD.UserComment] =
      userComment.toString('binary');

    console.log('Updated EXIF data:', exifObj);

    // Insert modified EXIF data back into the image
    const newExifData = piexif.dump({ ...exifObj, GPS: gps });
    console.log('Dumped EXIF data length:', newExifData.length);

    const newImage = piexif.insert(newExifData, base64Image);

    // Save the image with the new metadata
    fs.writeFileSync(imagePath, Buffer.from(newImage, 'binary'));
    console.log(`Metadata added to ${imagePath}`);
  } catch (error) {
    console.error(`Failed to add metadata: ${error.message}`);
  }
};

/**
 * Encode a string to UCS-2 (UTF-16LE) format.
 *
 * @param {string} text - The text to encode.
 * @returns {Buffer} - The encoded text as UCS-2 bytes.
 */
const encodeUCS2 = (text) => {
  const buffer = Buffer.alloc(text.length * 2); // 2 bytes per character
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    buffer.writeUInt16LE(code, i * 2);
  }
  return buffer;
};

/**
 * Convert decimal degrees to EXIF-compatible DMS format.
 *
 * @param {number} degrees - Decimal degrees.
 * @returns {Array} - EXIF-compatible DMS format.
 */
const convertToDMS = (degrees) => {
  const absolute = Math.abs(degrees);
  const d = Math.floor(absolute);
  const m = Math.floor((absolute - d) * 60);
  const s = ((absolute - d - m / 60) * 3600).toFixed(2);

  return [
    [d, 1],
    [m, 1],
    [s * 100, 100],
  ];
};

// Example usage with command-line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node script.mjs <imagePath> "<description>"');
  process.exit(1);
}

const [imagePath, description] = args;
addMetadataToImage(imagePath, description);

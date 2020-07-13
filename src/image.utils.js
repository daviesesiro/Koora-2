// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

// Convert a Base64-encoded string to a File object
export function base64StringtoFile(base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

// Download a Base64-encoded file

export function downloadBase64File(base64Data, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64
    image.onload = function () {
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )
    }
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
export function getCroppedImg(image, crop, fileName, canvas) {
    const size = 280;
    // const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'medium';
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        size,
        size,
    );
    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            const file = new File([blob], fileName)
            resolve(file);
        }, 'image/jpeg', 1);
    });
}
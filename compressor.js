document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const compressButton = document.getElementById('compressButton');
    const result = document.getElementById('result');
    const compressedImage = document.getElementById('compressedImage');
    const message = document.getElementById('message');
    const downloadButton = document.getElementById('downloadButton');

    imageInput.addEventListener('change', function() {
        result.style.display = 'none';
    });

    compressButton.addEventListener('click', function() {
        const file = imageInput.files[0];

        if (!file) {
            alert('Please select an image.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const originalImage = new Image();
            originalImage.src = event.target.result;

            originalImage.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800;
                const maxHeight = 800;

                let newWidth = originalImage.width;
                let newHeight = originalImage.height;

                if (originalImage.width > maxWidth || originalImage.height > maxHeight) {
                    if (originalImage.width > originalImage.height) {
                        newWidth = maxWidth;
                        newHeight = (originalImage.height * maxWidth) / originalImage.width;
                    } else {
                        newHeight = maxHeight;
                        newWidth = (originalImage.width * maxHeight) / originalImage.height;
                    }
                }

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

                const compressedDataURL = canvas.toDataURL('image/jpeg', 0.5);

                if (compressedDataURL === event.target.result) {
                    message.textContent = "Image cannot be compressed any further without harming the quality.";
                    downloadButton.style.display = 'none';
                } else {
                    compressedImage.src = compressedDataURL;
                    result.style.display = 'block';
                    downloadButton.style.display = 'block';
                    downloadButton.href = compressedDataURL;
                    downloadButton.download = 'compressed_image.jpg';
                }
            };
        };

        reader.readAsDataURL(file);
    });
});

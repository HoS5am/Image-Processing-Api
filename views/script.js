const thumbnailContainer = document.getElementById('thumbnail-container');
const filenameInput = document.getElementById('filename');

// A function to load the thumbnails and update the UI each time it's invoked.
async function loadThumbnails() {
  try {
    // Getting the images from the /availableImages endpoint and testing for their validity.
    const response = await fetch('/availableImages');
    if (!response.ok) throw new Error('Failed to fetch image filenames.');

    const filenames = await response.json();
    thumbnailContainer.innerHTML = '';

    // Loops through the images and creates an img element for each image.
    filenames.forEach((name) => {
      const img = document.createElement('img');
      img.src = `/image?filename=${name}`;
      img.alt = name;
      img.dataset.filename = name;

      // Add the selected class on the image clicked upon.
      img.addEventListener('click', () => {
        document.querySelectorAll('.thumbnail-grid img').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        filenameInput.value = name;
      });

      // Add all the images to the container in the WebPage.
      thumbnailContainer.appendChild(img);
    });
  } catch (err) {
    alert(err.message);
  }
}

// DOM loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadThumbnails();
});

// Handles resizing the image

document.getElementById('resize-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const filename = document.getElementById('filename').value.trim();
  const width = document.getElementById('width').value.trim();
  const height = document.getElementById('height').value.trim();

  // Checks whether any field is empty.
  if (!filename || !width || !height) {
    alert('Please fill out all fields.');
    return;
  }

  // Checks whether width or height are not positive.

  if (width <= 0 || height <= 0) {
    alert('Width and height must be positive numbers.');
    return;
  }

  const imageUrl = `images?filename=${filename}&width=${width}&height=${height}`;

  const img = new Image();
  img.src = imageUrl;
  img.alt = `Resized ${filename}`;

  // Adds the image and the URL to the WebPage.

  img.onload = () => {
    const container = document.getElementById('image-container');
    const linkText = document.getElementById('image-url-text');
    const copyBtn = document.getElementById('copy-link-btn');
  
    container.innerHTML = '';
    linkText.innerHTML = '';
  
    container.appendChild(img);
    linkText.textContent = img.src;
    
    // Copying the link to clipboard.

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(img.src).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Link';
        }, 2000);
      });
    };
  };

  img.onerror = () => {
    alert('Failed to load image. Please make sure the backend is running and the image exists.');
  };
});


// Handle upload form
document.getElementById('upload-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('imageUpload');
  const file = input.files[0];

  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error || 'Upload failed');
    }

    const result = await response.json();
    alert(result.message);

    // Clear input
    input.value = '';

    // Refresh thumbnails
    await loadThumbnails(); 
  } catch (err) {
    alert(err.message);
  }
});

// Handle theme toggle (light and dark modes)
const toggleTheme = document.getElementById("theme-toggle");

toggleTheme.addEventListener('click', () => {
  // Gets the current theme from the css file and sets the theme to the other one when pressing the toggle.
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  toggleTheme.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

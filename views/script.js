// Getting a list of the images available in the directory

document.addEventListener('DOMContentLoaded', async () => {
  const thumbnailContainer = document.getElementById('thumbnail-container');
  const filenameInput = document.getElementById('filename');

  try {
    const response = await fetch('/availableImages');
    if (!response.ok) throw new Error('Failed to fetch image filenames.');

    const filenames = await response.json();
    thumbnailContainer.innerHTML = '';

    filenames.forEach((name) => {
      const img = document.createElement('img');
      img.src = `/image?filename=${name}`;
      img.alt = name;
      img.dataset.filename = name;

      img.addEventListener('click', () => {
        document.querySelectorAll('.thumbnail-grid img').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        filenameInput.value = name;
      });

      thumbnailContainer.appendChild(img);
    });
  } catch (err) {
    alert(err.message);
  }
});

// Handles resizing the image

document.getElementById('resize-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const filename = document.getElementById('filename').value.trim();
  const width = document.getElementById('width').value.trim();
  const height = document.getElementById('height').value.trim();

  if (!filename || !width || !height) {
    alert('Please fill out all fields.');
    return;
  }

  const imageUrl = `images?filename=${filename}&width=${width}&height=${height}`;

  const img = new Image();
  img.src = imageUrl;
  img.alt = `Resized ${filename}`;
  img.onload = () => {
    const container = document.getElementById('image-container');
    const linkText = document.getElementById('image-url-text');
    const copyBtn = document.getElementById('copy-link-btn');
  
    container.innerHTML = '';
    linkText.innerHTML = '';
  
    container.appendChild(img);
    linkText.textContent = img.src;
  
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

// Changes Theme

const toggleTheme = document.getElementById("theme-toggle");

toggleTheme.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  toggleTheme.textContent = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

# Image Processing API
## A Web Application that allows users to preview and resize images instantly. it contains an API that resizes images by specifying their width and height via URL parameters.

### Features

- Image Selection: Choose an existing image from a list of available images.

- Image Resizing: Specify width and height to resize the image dynamically.

- Preview & Link: Preview the resized image and get the URL of the resized image.

- Dark Mode/Light Mode: Switch between dark and light themes.

### Dependencies & Technologies used:
- Frontend:
    - HTML
    - CSS
    - JavaScript (ES6+)
    - Fetch API for backend communication

- Backend:
    - Node.js
    - Express.js
    - File System (fs)
    - Sharp
    - Jasmine


### Installation Guide

Clone the repository & navigate to it

`git clone https://github.com/HoS5am/Image-Processing-Api.git`

`cd Image-Processing-Api`

Install all the dependencies

`npm install`

Format the code

`npm run prettier`

Lint the code

`npm run lint`

Build & test the TypeScript code

`npm run test`

Run the Server

`npm run start`

### Usage

1. Select an Image: Choose an image from the available list displayed as thumbnails.

2. Set Resize Parameters: Enter the desired width and height for the image.

3. Generate Image: Click the "Generate Image" button to resize the image and display it.

4. Preview and Copy Link: Once the image is resized, it will appear below the form. You can copy the URL of the resized image using the "Copy Link" button.

### Endpoints

1. > /availableImages

    - **Method**: GET

    - **Description**: Returns a list of available image filenames from the /images/original folder.

    - **Response**: An array of image filenames (e.g., ["supra.jpg", "xp.png"]).

2. > /image

    - **Method**: GET

    - **Description**: Returns the specified images from the /images/original folder.

    - **Response**: the image (e.g., 'supra.jpg').

    - e.g. http://localhost:3000/image?filename=supra.jpg

3. > /images

    - **Method**: GET

    - **Query Parameters**:
        1. filename: Name of the image to resize (e.g., verse.jpg).
        2. width: The width of the resized image in pixels (e.g., 300).
        3. height: The height of the resized image in pixels (e.g., 200).

    - **Description**: Resizes the selected image and returns the resized image URL.

    - **Response**: Resized image URL.

    - e.g. http://localhost:3000/images?filename=starrynight.jpg&width=600&height=600
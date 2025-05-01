# Image Processing API
## An API to change the *dimensions* of an jpg image.

### Dependencies & Technologies used:
- Typescript
- Jasmine
- Express
- Sharp


### How to use:

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

### Endpoints

A list of all the images in your directory.

> https://localhost:3000/

Shows the image

> https://localhost:3000/image

eg. https://localhost:3000/image?filename=starrynight.jpg

The resizing endpoint

> https://localhost:3000/images

eg. http://localhost:3000/images?filename=starrynight.jpg&width=600&height=600
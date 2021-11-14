# Same Day custom Test

- Please use YARN when building when installing dependencies and building the
  project.
- Rename .env.sample file to .env
- Only 100 fonts are loaded (sorted by popularity) because of the text preview.
  Loading all the fonts to generate preview is a bit inefficient.
- Escape will deselect all items on the canvas.
- Delete button will remove all selected items.
- Scaling from the corners will preserve the aspect ratio. Use shift when
  scaling to stretch or squish objects.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

# Salary Management App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- The app is responsive; built on a single route, all API endpoints point to BASE_URL : https://nphc-hr.free.beeceptor.com/employees
- Rate-limited responses have been persisted on localStorage
- The shared folder currently only holds interface definitions, but has been designed this way for future /services or /contexts
- DragDrop component uses the out-of-box react library : react-dropzone. Please refer to issues reported on the library if you encounter one, before it could be added to the issues on this app.
- Components like tables, modals, backdrop, buttons and icons have been imported from material-ui for react, to stay consistent with design across app.
- The sort and search functionality on the table are custom. Action column does not support sorting. Search can be done only on the salary column.
- All API requests are made over axios
- Testing framework used are: Jest, Enzyme.
- All additional frameworks and definitions required to run tests have been added.

## Work in Progress

- Additional tests for components
- Auto refresh employee list when use uploads excel(using the context system)
- Better styles for the rows in the table
- Adding coverage for tests
## Enhancements

- [UI] Slide-in/out nav
- [UI] Hide 'id' column in the table in sm scale devices
- [UI] Disable 'UPDATE' button when fields are unedited
- Debounce clicks : Upload button
## Available Scripts
### `npm start`

- Checkout the code from master
- Run 'npm install' or 'yarn install' in the root
- Run 'npm start' to run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `npm test`

- Checkout the code from master
- Run 'npm install' or 'yarn install' in the root
- Run 'npm test'
Launches the test runner in the interactive watch mode.

### Link to Netlify/CodeSandbox : 
Coming Soon!
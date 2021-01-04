# ProjectShare UI

ProjectShare is a prototype we built to explore the building of an application which allows uploading and downloading files for projects. Also we experimented with the usage of [Go](https://golang.org/) as a backend server for [React](https://reactjs.org/) applications.

We built the frontend with [React](https://reactjs.org/) and used [Material UI](https://material-ui.com/) for designing the application.

If you want to learn more about the Backend we used check out the [Repository](https://github.com/Tiffinger-Thiel-GmbH/projectshare-api)

## Run

Use the package manager [yarn](https://yarnpkg.com/) to run ProjectShare.

```bash
cd frontend/ && yarn dev
```

## Project structure

The whole source code is stored inside the `frontend/src/` directory.

The entry point is located inside the `index.tsx` while the `App.tsx` is the first React component

Then the `Home.tsx` is rendered and holds the AppBar and Content which are all stored inside the `pages/` folder while the smaller sub-components are located inside the `components` directory

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

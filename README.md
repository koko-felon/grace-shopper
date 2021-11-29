# The Smallest Starting Point

So, you want to build a full-stack JavaScript application with:

- An Express web server
- A PostgreSQL database
- A React front-end

And you want it to work locally as well as be easy to deploy?

We've got your back:

## Local Development

### Setting Up

First, clone this repo locally, then remove the current `.git` folder. Follow this up with making it a new git repo.

```bash
rm -rf .git

git init
```

Then go to GitHub, create a new repository, and add that remote to this local repo.

Then, run `npm install` to install all node modules.

You should decide on a name for your local testing database, and edit `src/db/index.js` changing the value of `DB_NAME`.

Once you decide on that name, make sure to run `createdb` from your command line so it exists (and can be connected to).

Finally you can run `npm start` to start both the backend web server AND the React server.

This project uses the excellent [`per-env`] package to run either `npm run start:development` or `npm run start:production` when you simply
run `npm start`

This is set up to run on a proxy, so that you can make calls back to your `api` without needing absolute paths. You can instead `axios.get('/api/posts')` or whatever without needing to know the root URL.

Once both servers are running, you can start developing... the server restarts thanks to `nodemon`, and the client restarts thanks to `react-scripts`.

### Project Structure

```bash
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── api
    │   ├── index.jsx
    │   └── index.test.jsx
    ├── components
    │   ├── App.jsx
    │   ├── App.test.jsx
    │   └── index.jsx
    ├── db
    │   ├── index.js
    │   ├── seed.js
    │   ├── seedData.js
    │   └── seedData.test.js
    ├── express
    │   ├── app.js
    │   ├── app.test.js
    │   ├── routes
    │   │   └── apiRouter.js
    │   └── server.js
    ├── index.jsx
    └── setupTests.js
```

All of the source code for this full stack application is inside of `src`.

### The Express Server

`src/express` contains everything to do with your backend express server.

`/src/express/app.js` is your Express Server. This should be responsible for setting up your API, including all your middleware

`src/express/server.js` is where we start up the express server
itself, and we also make our initial database connection.

Inside `/src/express/routes` you have `apiRouter.js` which is responsible for building the `apiRouter`, which is attached in the express server. This will build all routes that your React application will use to send/receive data via JSON. Feel free to make other
router files in here to hold sub-routes.

### The Database Layer

Inside `/src/express/db` you have `index.js` which is responsible for creating all of your database connection functions, and `seed.js` which should be run when you need to rebuild your tables and seed data. `seedData.js` contains the functions which `seed.js` uses to do this work.  You should run `npm run seed` to rebuild and seed your database.

### The React Layer

The React frontend starts with the `index.jsx` file in the `src` folder.  All the React Components including `<App/>` live in `/src/components`.

You'll notice we've named files that include JSX with the extension `.jsx`.  This
can be useful to help you keep straight which files are frontend and which are backend.

The `src/api` folder contains a sample file for code that will make axios or fetch
requests to your backend.

`/public` contains the index.html file for the React frontend.

## Testing

We have examples of three types of tests in this repo. Because we are using `react-scripts`, simply running `npm test` will attempt to run the tests. You'll notice you can make a file named `<module>.test.js(x)` and it will run that file as a test.  This is the recommend approach for React apps, and it also works for our backend tests.

### Express Tests

There are two tests related to testing the express app, `src/express/app.test.js` which makes a simple call to make sure the express app is working, and `src/express/routes/apiRouter.test.js` which tests a get call to `/api`.

These tests use [`supertest`] to test making api calls to the backend. Feel free to follow
their example to write your own backend tests

### Database Tests

The included database test shows an example of testing the seedData file and it's functions to make sure the table is created properly and that the data is seeded properly. Because of this we have included a sample `users` table and data. Feel free to replace this with your own and use these test files as examples of how to test your Database layer.

### React Tests

There's two types of tests that test the frontend. One tests the `<App/>` component in `/src/components/App.test.jsx` and the other tests a sample api client function in `/src/api/index.jsx`

These use [React Testing Library] and [Mock Service Worker] to test the components.

Feel free to make tests for each of your components.

## Deployment

### Setting up Heroku (once)

```bash
heroku create hopeful-project-name

heroku addons:create heroku-postgresql:hobby-dev
```

This creates a heroku project which will live at https://hopeful-project-name.herokuapp.com (note, you should change this to be relevant to your project).

It will also create a postgres database for you, on the free tier.

### Deploying

Once you've built the front-end you're ready to deploy, simply run `git push heroku master`. Note, your git has to be clean for this to work (which is why our two git commands live as part of getting ready to deploy, above).

This will send off the new code to heroku, will install the node modules on their server, and will run `npm start`, starting up your express server.

If you need to rebuild your database on heroku, you can do so right now with this command:

```bash
heroku run npm run seed
```

Which will run `npm run seed` on the heroku server.

Once that command runs, you can type `heroku open` to get a browser to open up locally with your full-stack application running remotely.

[per-env]:https://github.com/ericclemmons/per-env
[React Testing Library]:https://testing-library.com/docs/react-testing-library/intro/
[`supertest`]:https://www.npmjs.com/package/supertest
[Mock Service Worker]:https://www.npmjs.com/package/msw

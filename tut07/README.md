# Tutorial 7

[TOC]

## A. Zune bug - Using Coverage

> 10 minutes

Below is a piece of code that you may remember from a previous week's activity:
```ts
const ORIGIN_YEAR = 1970;

const isLeap = (y: number) => new Date(y, 1, 29).getDate() === 29;

export const dayToYear = (days: number) => {
  let year = ORIGIN_YEAR;
  while (days > 365) {
    if (isLeap(year)) {
      if (days > 366) {
        days -= 366;
        year += 1;
      } else {
        continue;
      }
    } else {
      days -= 365;
      year += 1;
    }
  }
  return year;
};
```

1. What is code coverage and how it can be useful?
    > - Code coverage is a metric to quantify how much of written source code is executed during testing.
    > - Can help developers improve their tests by considering and accounting for more scenarios in their the code.

1. Run the current tests in
   [a.zunebug/day-to-year.test.ts](a.zunebug/day-to-year.test.ts) with the
   `--coverage` option from `vitest`.
    > You can either pass the `--coverage` flag e.g.
    > ```sh
    > npm run test -- --coverage
    > ```
    > Or modify the script in package.json e.g.
    > ```json
    > "scripts": {
    >   "test": "vitest run --coverage",
    > }
    > ```
    > ```shell
    > npm run test
    > ```

    While the coverage table printed to the terminal is nice, vitest also
    generates a HTML coverage report. Open the generated `html` file in your
    browser. How can we interpret this result?
    > Open `./coverage/lcov-report/index.html`, select the file and hover mouse on the highlighted lines for reason.

1. Write a test case to achieve 100% coverage.
    > ```ts
    > { days: 365 + 365 + 366, year: 1972 }, // "December 31st 1972"
    > ```

1. Make any modifications to the program as appropriate.
    > ```ts
    > } else {
    >   break;
    > }
    > ```
    > after `if (days > 366) {`

## B. Movies

Below is the MVP interface for a movie data system:

<table>
  <tr>
    <th>Name & Description</th>
    <th>HTTP Method</th>
    <th>Data Types</th>
    <th>Errors</th>
  </tr>
  <tr>
    <td>
      <code>/movie/add</code>
      <br/><br/>
      Adds a movie to the data store.
    </td>
    <td>
       POST
    </td>
    <td>
      <b>Body Parameters</b>:
      <br/>
      <code>{title, director}</code>
      <br/><br/>
      <b>Return Object</b>:
      <br/>
      <code>{movieId}</code>
    </td>
    <td>
      <code>{error, message}</code> when any of:
      <ul>
        <li><b>INVALID_MOVIE_DETAILS</b>: <br />title is an empty string, ""</li>
        <li><b>INVALID_MOVIE_DETAILS</b>: <br />director is an empty string, ""</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <code>/movie/:movieid</code>
      <br/><br/>
      Edits a movie in the data store.
    </td>
    <td>
      PUT
    </td>
    <td>
      <b>Body Parameters</b>:
      <br/>
      <code>{movieId, title, director}</code>
      <br/><br/>
      <b>Return Object</b>:
      <br/>
      <code>{}</code>
    </td>
    <td>
      <code>{error, message}</code> when any of:
      <ul>
        <li><b>INVALID_MOVIE_ID</b>: <br />movieId does not refer to an existing movie</li>
        <li><b>INVALID_MOVIE_DETAILS</b>: <br />title is an empty string, ""</li>
        <li><b>INVALID_MOVIE_DETAILS</b>: <br />director is an empty string, ""</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <code>/movies/list</code>
      <br/><br/>
      Lists all movies in the data store.
    </td>
    <td>
        GET
    </td>
    <td>
      <b>Query Parameters</b>:
      <br/>
      <code>{}</code>
      <br/><br/>
      <b>Return Object</b>:
      <br/>
      <code>{movies}</code>
    </td>
    <td>
      N/A
    </td>
  </tr>
  <tr>
    <td>
        <code>/clear</code><br /><br />
        Delete all movie data and return an empty object.
    </td>
    <td>
        DELETE
    </td>
    <td>
      <b>Query Parameters</b>:
      <br/>
      <code>{}</code>
      <br/><br/>
      <b>Return Object</b>:
      <br/>
      <code>{}</code>
    </td>
    <td>
        N/A
    </td>
  </tr>
</table>

This interface has also been transformed into a [swagger.yaml](b.movies/swagger.yaml).

### Part 1 - Server Coverage

> 5 mins

Now that we've learned how to use `vitest run --coverage` ...
- **Question**: is it possible to measure the code of our express server this way?
  > If you try to run tests on the server, you'll find the coverage reports on
  > the test files instead of the server files we desire.
  > ```sh
  > # In one terminal
  > npm run start
  > # In another terminal
  > npm run test -- --coverage
  > ```
  > The coverage report outputed will be empty and might look similar to...
  >
  > File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
  > ----------|---------|----------|---------|---------|-------------------
  > All files |       0 |        0 |       0 |       0 |
  >
- **Answer**: No!

Unfortunately, our test with jest, which utilises
[sync-request](https://www.npmjs.com/package/sync-request), is only making HTTP
requests to a server at a certain URL address. Visually, this looks like

<div align="center">

```
+----------------+                               +----------------+
|                |   >>>>  HTTP Requests  >>>>   |                |
|     Tests      |                               | Express server |
|                |   <<<<  HTTP Response  <<<<   |                |
+----------------+                               +----------------+
```

</div>

This means that our tests do not know about the implementation of our server (only what comes in and out) and thus cannot measure coverage directly.

So... how can we measure the code coverage of our server?
<details>
  <summary>Click to reveal answer.</summary>

  By directly measuring coverage when running the server itself - we can do this with a nifty tool called [c8](https://www.npmjs.com/package/c8)!
</details>

> To do this:
> 1. Run our server with the coverage reporter.
> ```sh
> # In one terminal
> npm run start-coverage
> ```
> 2. Run our test suite.
> ```sh
> # In another terminal
> npm run test
> ```
> 3. Stop the server using "CTRL + C" to see the coverage report.

> Coverage is critical to the automark for iteration 2!

### Part 2 - Exceptions

> 20 mins

1. In [b.movies/src/movie.ts](b.movies/src/movie.ts)
  - Remove the `ErrorObject` from the union return type of the `movieAdd` function.
  - Modify the function to throw a basic `Error` exception (instead of returning an object for errors).
    > <details close>
    > <summary>click to view</summary>
    >
    >```ts
    > export function movieAdd(title: string, director: string): MovieAddReturn {
    >   if (title === '' || director === '') {
    >     throw new Error('INVALID_MOVIE_DETAILS');
    >   }
    >
    >   const data = getData();
    >
    >   const movieId = data.movies.length;
    >   data.movies.push({ movieId, title, director });
    >   return { movieId };
    > }
    >```
    >
    ></details>

2. In [b.movies/src/server.ts](b.movies/src/server.ts), use try-catch blocks to handle the exceptions for `movieAdd`
    > <details close>
    > <summary>click to view</summary>
    >
    > ```ts
    > app.post('/movie/add', (req: Request, res) => {
    >   const title = req.body.title;
    >   const director = req.body.director;
    >
    >   try {
    >     const result = movieAdd(title, director);
    >     res.json(result);
    >   } catch (e) {
    >     res.status(400).json({
    >       error: e.message,
    >       message: 'Title or Director is empty',
    >     });
    >   }
    > });
    > ```
    >
    > </details>

3. This works well when the error message is always the same, but what if there are two possible errors? How can we include both the error type and error message in the details?
  - Remove the `ErrorObject` from the union return type of the `movieEdit` function.
  - Modify the function to throw a basic `Error` exception with both fields in the single string.
    > <details close>
    > <summary>click to view</summary>
    >
    >```ts
    > export function movieEdit(movieId: number, title: string, director: string): EmptyObject {
    >   const movie = getData().movies.find(m => m.movieId === movieId);
    >   if (movie === undefined) {
    >     // Put the error type and message in the same string
    >     throw new Error(`INVALID_MOVIE_ID: No existing movie with movieId: ${movieId}`);
    >   }
    >
    >   if (title === '') {
    >     throw new Error(`INVALID_MOVIE_DETAILS: Title '${title}' is empty`);
    >   }
    >
    >   if (director === '') {
    >     throw new Error(`INVALID_MOVIE_DETAILS: Director '${director}' is empty`);
    >   }
    >
    >   movie.title = title;
    >   movie.director = director;
    >
    >   return {};
    > }
    >```
    >
    ></details>

4. In [b.movies/src/server.ts](b.movies/src/server.ts), use try-catch blocks to handle the exceptions for `movieEdit`
  - You will need a way to extract the two error details
    > <details close>
    > <summary>click to view</summary>
    >
    > ```ts
    > app.put('/movie/:movieid', (req: Request, res: Response) => {
    >   const movieid = parseInt(req.params.movieid);
    >   const title = req.body.title;
    >   const director = req.body.director;
    >
    >   try {
    >     const result = movieEdit(movieid, title, director);
    >     res.json(result);
    >   } catch (e) {
    >     // Split out the error type from the front of the string
    >     const error = e.message.split(': ')[0];
    >     res.status(400).json({
    >       error: error,
    >       message: e.message,
    >     });
    >   }
    > });
    > ```
    >
    > </details>

5. Run the tests to ensure they are still passing.

6. Is there a nicer way can include both error type and message in our `Error`? Just like how objects can have multiple fields, so can errors (because they are just special objects)!
  - Change `movieEdit` to throw the `CustomError` exception
  - Update [b.movies/src/server.ts](b.movies/src/server.ts) to now use this
  - **NOTE: It is important to rethrow errors if they are not our own, so that other try catch blocks further up may handle them!**
  - In the project, you will get given a custom error to use if you like this approach better!
    > <details close>
    > <summary>click to view</summary>
    >
    >```ts
    >// movie.ts
    >
    >// A custom exception class that can take both error and message. Something like this will be provided in the project.
    > export class MovieError extends Error {
    >   error: string;
    >
    >   constructor(error: string, message: string) {
    >     super(message);
    >     this.error = error;
    >   }
    > }
    >
    > export function movieEdit(movieId: number, title: string, director: string): EmptyObject {
    >   const movie = getData().movies.find(m => m.movieId === movieId);
    >   if (movie === undefined) {
    >     throw new MovieError('INVALID_MOVIE_ID', `No existing movie with movieId: ${movieId}`);
    >   }
    >
    >   if (title === '') {
    >     throw new MovieError('INVALID_MOVIE_DETAILS', `Title '${title}' is empty`);
    >   }
    >
    >   if (director === '') {
    >     throw new MovieError('INVALID_MOVIE_DETAILS', `Director '${director}' is empty`);
    >   }
    >
    >   movie.title = title;
    >   movie.director = director;
    >
    >   return {};
    > }
    >
    > // server.ts
    >
    > app.put('/movie/:movieid', (req: Request, res: Response) => {
    >   const movieid = parseInt(req.params.movieid);
    >   const title = req.body.title;
    >   const director = req.body.director;
    >
    >   try {
    >     const result = movieEdit(movieid, title, director);
    >     res.json(result);
    >   } catch (e: unknown) {
    >     if (e instanceof MovieError) {
    >       // The error `e` was our `MovieError` type, respond with the error details.
    >       return res.status(400).json({
    >         error: e.error,
    >         message: e.message,
    >       });
    >     }
    >
    >     // Was not an error we threw... Rethrow it so it can be handled elsewhere.
    >     throw e;
    >   }
    > });
    >```
    >
    ></details>

### Part 3 - Persistence

> 10 mins

Currently, once the program runtime ends, all the movies in the data system will be lost.

1. Write a function `save()` in [dataStore.ts](./b.movies/src/dataStore.ts) that when called will save all existing movies in the dataStore to a json file called 'movieDatabase'
> <details close>
> <summary>click to view</summary>
>
>```js
>import fs from 'fs'
>
>export function save() {
>  const jsonString = JSON.stringify(dataStore)
>  fs.writeFileSync(__dirname + '/movieDatabase.json', jsonString)
>}
>```
>
></details>

2. How can we access the movies stored in the database when we next restart the program?
> <details close>
> <summary>click to view</summary>
>
>```js
>import fs from 'fs'
>
>export function load() {
>  if (fs.existsSync(__dirname + '/movieDatabase.json')) {
>    const databaseString = fs.readFileSync(__dirname + '/movieDatabase.json');
>    dataStore = JSON.parse(String(databaseString));
>  }
>}
>
>```
>
></details>

3. As a class, discuss when and where you could use these functions to ensure that the movie database is still saved if the server was closed or crashed.
> Some possible options (there is more than one correct answer):
> - Call load once in dataStore.ts to initially load previous data, then use save() whenever saving to dataStore
> - Call load once in server.ts when server first starts, then use save() at the end of each route which changes the dataStore

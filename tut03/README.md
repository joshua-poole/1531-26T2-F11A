# Tutorial 3

[TOC]

## Interface

Below is the interface for a playlist system in which users can create playlists with songs in them.

| Name & Description | Parameters | Return | Errors |
| --- | --- | --- | --- |
| `addUser`<br>Registers a user with an email and password. | `email`, `password` | `{userId}` | `{error}` when any of: <ul><li>email is an invalid email<li>password is an empty string</ul>
| `addSong`<br>Adds a new song to the database. | `name`, `artist`, `duration` | `{songId}` | `{error}` when any of: <ul><li>name is an empty string<li>artist is an empty string<li>duration is less than 0 or greater than 10</ul>
| `addToPlaylist`<br>Adds a song to a users playlist. | `userId`, `songId` | `{}` | `{error}` when any of: <ul><li>userId is invalid<li>songId is invalid<li>song is already in users playlist</ul>
| `listPlaylist`<br>Lists all of the songs in a users playlist. | `userId` | `{songs}` |  `{error}` when any of: <ul><li>userId is invalid |
| `clear`<br>Returns the program to its original state. | N/A | `{}` | N/A|

| Variable | Type |
| --- | --- |
| **error** | `string`, with the value being a relevant error message of your choice |
| **email** | `string` |
| **password** | `string` |
| **name** | `string` |
| **duration** | `number`, specifically Integer|
| **artist** | `string` |
| contains suffix **Id** | `string` |
| **songs** | Array of objects, where each object has type `{songId, name, duration}` |

## A. Working with multiple files

When working with a large codebase, it's good practice to break down and organize code into separate
files. This helps prevent files from becoming too large and makes it easier to locate specific
elements when needed. Additionally, functions that are used across multiple files for common tasks
can be consolidated into a separate helper functions file.

1. Move the datastore object from [playlist.js](playlist/src/playlist.js) into another file called
   [dataStore.js](playlist/src/dataStore.js).

1. How can we access and use the datastore now?

1. Review [playlist.js](playlist/src/playlist.js) and identify repetitive code chunks that could be
   refactored into a helper function.

2. Move this helper function into a file called [helper.js](playlist/src/helper.js).

## B. Packages

Packages are a bunch of pre-written tools that help you write code more efficiently. Similar to
how we can `#include <math.h>` in C to use math functions, we can import a math package to use math
functions in JavaScript e.g. [mathjs](https://www.npmjs.com/package/mathjs).

`npm` a.k.a the Node package manager, helps us manage the packages we want to use in each project.

1. Identify what we might need to use packages for in the `addUser` function.

2. Look through [npm](https://www.npmjs.com/) and find functions appropriate to perform the tasks you identified.

1. Use these packages to complete the `addUser` and `addSong` function.

## C. Testing

Writing tests is important! We want to make sure that when we make changes, it
won't break existing code.

We will be using `vitest` to write tests. Install vitest as a dev dependency with
```shell
$ npm install vitest --save-dev # or npm i vitest -D
```
and then create a file of type `.test.js` to declare it as a test file.

Now we can start writing tests!

### Writing tests

As a class, write some tests for the `addUser` function in
[playlist.test.js](playlist/src/playlist.test.js). What are some things you may need to test for?

### Coverage

Now that we've written some tests, we'd like to know how well our tests "cover" our code. Remember
that any code that's not tested, could have bugs in it!

To do this we will be using the `v8` coverage checker, install it with the following:
```shell
$ npm i -D @vitest/coverage-v8
```
Then add a coverage script to [package.json](playlist/package.json).
```json
"scripts": {
  ...
  "coverage": "vitest run --coverage"
},
```
Now, run coverage and see how well the current tests validate the codebase!

### Black-box Testing

For iteration 1, the expectation is that all tests are black box.

This means tests should be written such that they are based only on the public
[interface](#interface) and without knowledge of internal implementation details. E.g. directly
importing the `dataStore` object in playlist tests would not be blackbox!

How can we validate that the `clear` function resets the program to its initial state?

### Debugging

Uncomment the rest of the provided tests and run them. Use the outcome of the tests to debug a
function. Ensure it passes all tests.

Tips:
- Use test.only to run one test
- Use test.skip to skip specified tests

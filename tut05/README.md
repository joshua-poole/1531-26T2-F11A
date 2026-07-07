# Tutorial 5

[TOC]

## A. Express Server Build

> 45 minutes

Before we get started, here is a diagram that you can reference when transitioning from iteration 1 to iteration 2:

<details close>
<summary>click to view</summary>

![Tutorial Diagram](./assets/image.png)

</details>

### API documentation

From iteration 2 onwards, the specification will be written in swagger.

A [swagger.yaml](a.express/swagger.yaml) file is also available for this tutorial exercise.

Open the rendered file (e.g. on GitLab) and explore the inputs/outputs. Play around, toggle between `Example Value | Model` in each route, etc

### Part 1 - Setting up

1. Open [a.express/package.json](a.express/package.json) and look through `"scripts"`,  `"dependencies"` and `devDependencies`. Install the packages if not already.  
  Note: `tsx watch` is used to automatically restart the server when we make changes to the files.

### Part 2 - Building the backend

The implementation details have been completed as functions in the file [a.express/src/people.ts](a.express/src/people.ts), similar to your major project's iteration 1.

1. Your tutor will demonstrate how you can implement the `/people/add` and `/people/list` server route by reusing and wrapping around the existing functions in [a.express/src/people.ts](a.express/src/people.ts).  
A hackmd template has been provided for optional use (for group collaboration)

1. In groups, complete the remaining routes in [a.express/src/server.ts](a.express/src/server.ts) by following the steps below:
    1. identify the appropriate `HTTP` method (POST/GET/PUT//DELETE)
    1. identify the input parameter type (Query/Body)
    1. implement your assigned route as a wrapper around the corresponding function.

> Completed routes in [here](solutions/a.express/src/server.ts)

### Part 3 - Writing HTTP Tests

In [people.test.ts](a.express/src/people.test.ts), some tests have been provided for functions `clear`, `peopleAdd`, `peopleList` and `personView`. These tests currently call each function directly, similar to your iteration 1 tests.

As a class, convert these tests to make requests to the server (instead of calling the function directly). This process is similar to what you will need to do to convert your tests for iteration 2

For each function:
1. Use the `model` button in the swagger file to find the types for the variables
2. Write a `request` to the server for this route
3. Convert the existing tests to use the server request

> tutor note: please emphasise the process of taking existing tests for function (like the ones in iteration 1), writing server requests based off the swagger file, then converting the existing tests to use the server requests (which is what students need to do for iteration 2)
>
> If time permits, demonstrate writing a test using a raw request, then demonstrate how using a requestWrapper instead is a neater solution

> Sample tests [here](solutions/a.express/src/people.test.ts) (note: a full test suite can be found further below).

### Part 4 - Testing

Run the server and tests on two different terminals and observe the output and results.

Consider also opening the backend server url in a browser and/or using an API client such as ARC, Insomnia or Postman. On VLAB, these applications can be accessed by:
- 1531 arc
- 1531 insomnia
- 1531 postman

> A complete test suite can be found [here](solutions/a.express/src/automarking.test.ts), which can be copied into the a.express/src directory.
>
> This demonstrates how HTTP tests can be simplified by writing wrapper "helper" functions that emulate iteration1-style testing (i.e. requests can be treated as function calls to avoid having to rewrite every tests).

### Part 5 - HTTP Errors

Currently, all errors return the status code 400. Consider the modified interface for `/people/add`, which now has both 400 and 401 status codes for errors:

<table>
  <tr>
    <th>Name & Description</th>
    <th>HTTP Method</th>
    <th>Data Types</th>
    <th>Errors</th>
  </tr>
  <tr>
    <td>
      <code>/people/add</code><br/><br/>
      Given a name and an age, add the entry into the data store if it is valid.
    </td>
    <td>
        ???
    </td>
    <td>
      <b>??? Parameters</b><br/>
      <code>{name: string, age: number}</code>
      <br/><br/>
      <b>Return Object</b><br/>
      <code>{}</code>
    </td>
    <td>
      Return <code>{ error, message }</code> with status code <code>401</code> when:
      <ul>
        <li>
          <b>INVALID_NAME:</b> The given name is an empty string, <code>""</code>.
        </li>
      </ul>
      Return <code>{ error, message }</code> with status code <code>400</code> when:
      <ul>
        <li>
          <b>INVALID_AGE:</b> The given age is not strictly positive.
        </li>
        <li>
          <b>DUPLICATE_NAME:</b> The given name already exists in the data store.
        </li>
      </ul>
    </td>
  </tr>
</table>

As a class, discuss some ways you might be able to modify the existing code to implement this new interface.

> <details close>
> <summary>click to view one possible solution</summary>
>
> In `people.ts`, add the status code to the return object:
>
> ```js
>  export function peopleAdd(name: string, age: number) {
>    const data = getData();
>    if (name === "") {
>        return { error: 'INVALID_NAME', message: 'Name is an empty string' };
>    }
>    if (findPersonByName(name)) {
>      return { error: 'DUPLICATE_NAME', message: 'Name already exists.' };
>    }
>    if (age <= 0) {
>      return { error: 'INVALID_AGE', message: 'Age is not strictly positive.' };
>    }
>  }
> ```
>
> Use this in `server.ts` to return the correct status code:
>
> ```js
>  app.post('/people/add', (req: Request, res: Response) => {
>    const { name, age } = req.body;
>    const result = peopleAdd(name, age);
>
>    if ('error' in result) {
>      if (result.error === 'INVALID_NAME') {
>        return res.status(401).json(result)
>      }
>      // all other errors result in a 400 status code
>      return res.status(400).json(result);
>    }
>
>    res.json(result);
>  });
> ```
> 
> Pro Tip: You could even define a common function like `errorToStatus(errorType: string): number` to determine the status code. 

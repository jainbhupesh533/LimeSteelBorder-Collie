
## Plentina Backend Developer Challenge
The aim of this challenge is to implement the requirements laid out below and to improve on the existing codebase. You may not import any other libraries other than the ones provided already in `package.json`. You have one week to finish this challenge upon receipt.

Upload your work in a public git repository with a name randomly generated from this website: https://www.imprima.com/resources/project-name-generator - `[Done]`


## System Requirements

1) Node v10 LTS

## Installation

```bash
$ npm install
```

## Usage
To run the app:
```bash
$ npm run start
```

To test the code:
```bash
$ npm run test
```

## Challenge Specifications
The app has a single endpoint, `/shape`, that takes in two objects in its payload. The endpoint checks if these two shapes will collide in a Cartesian plane and provides either a `true` or a `false` in one of the response's fields.

Complete the challenge by doing the following:
1) Finish the `/healthCheck` endpoint by returning your entire name as a string in the json response - `[Done]` 
2) Implement the unfinished `collides(other: Shape)` in the `Rect` class - `[Done]`
3) Create a new `Line` Shape class that implements `Shape`. Let it be usable as input in the endpoint for checking collisions (i.e. you should be able to check if a `Line` collides with another shape, including other `Line`s). -`[Done]`
Hint: `Shape` has a member `center`. For the purpose of this implementation, assume that `center` is one of the `Line`'s two end points. -`[Done]`
3) Add the necessary logging in various stages of the code- Added logger module   
4) Ensure that the currently implemented unit tests are all successful, and add new unit tests for edge cases and the newly added `Line` class - `[Done]`
5) Refactor the code to avoid duplication in `Rect` and `Circle` and the newly created `Line`. You may use any design patterns you want- `[Done]`
6) Clean the code as you see fit

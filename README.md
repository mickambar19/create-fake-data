<h1 align="center" background="salmon">
  create-fake-data
</h1>

[![Coverage](https://img.shields.io/badge/coverage-0%25-red)](https://)

## Overview

This library aims to ease the process of generating fake data into a newly genrated json file given a structure.

## Getting started

- Create a base.json in the location you want to create fake data

The key will be the name of the attribute where the fake data will be place. 
The value will be the name of the method you want to use, you can check existing methods
in [FakerJS API](https://fakerjs.dev/api/).

```
{
    "userName": "firstName",
    "userLastName": "lastName",
    "favoriteCat": "cat",
    "baseEmail": "email"
}
```

- Run the tool

```
npm init fake-data
```

or using npx

```
npx create-fake-data
```

The output should be a file in the current directory

{timestamp}_fakeData,json

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Open source software [licensed as MIT](/blob/main/LICENSE).

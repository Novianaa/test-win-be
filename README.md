# Project API

<!-- NAVIGATION -->
<ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#end-point">End-Point</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>

<!-- ABOUT THE PROJECT -->

## About The Project

Project test PT.Widya Informasi Nusantara.

[Dokumentasi Postman](https://documenter.getpostman.com/view/21597644/2s83zgu57N)

### Built With

- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org/)
- [CORS](https://www.npmjs.com/package/cors)
- [ENV](https://www.npmjs.com/package/dotenv)
- [BODY-PARSER](https://www.npmjs.com/package/body-parser)


### End-Point


| Request                                       | endpoint                                   |
| --------------------------------------------- | ------------------------------------------ |
| Register                                      | /auth/register                             |
| Login                                         | /auth/login                                |
| Get profile                                   | /profile/                                  |
| Add product                                   | /product/                                  |
| Get all product with search, sort, pagination | /product/?keyword=&orderBy=&sortBy=&limit= |
| Get product by id                             | product/:id                                |
| Update product by id                          | product/:id                                |
| Delete Product by id                          | product/:id                                |



<!-- GETTING STARTED -->

## Getting Started

Get started with this project, intructions on setting up your project locally.
To get a local copy up and running follow these simple steps.

### Prerequisites

Before installing, you must be install [nodejs and npm.](https://nodejs.org)

### Installation

1. Clone this repo

```sh
git clone https://github.com/Novianaa/WIN-be.git
```

2. Install NPM package

```sh
cd WIN-be
npm i
```

3. Start the project

```sh
npm start
```
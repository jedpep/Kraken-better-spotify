# Better Spotify Album Art

Enables users to display their currently playing song/podcast on their Kraken LCD devices.

## Installation

To run this, you will need to have [Node.js](https://nodejs.org/en) and [Yarn](https://yarnpkg.com/) installed on your computer.

## Setup

Clone this repository to your local machine.
Navigate to the project directory and run `yarn` to install dependencies.

Set up a Spotify Developer account and create a new Spotify application. Note down the client ID and client secret.
Create a .env.local file in the directory/folder of the project and add the following environment variables:

```
JWT_SECRET=<your-generated-jwt-secret>
NEXTAUTH_URL=http://localhost:3000
SPOTIFY_CLIENT_ID=<your-client-id>
SPOTIFY_CLIENT_SECRET=<your-client-secret>
```

For the JWT_SECRET, you can use this website to generate one, [jwtgenerator](https://www.javainuse.com/jwtgenerator) (it can be anything and it'll work)

Run the development server using `yarn dev`.
Open a supported web browser and navigate to http://localhost:3000.

## Example
![Alt 2](https://github.com/jedpep/Kraken-better-spotify/blob/main/20230924_151850.jpg?raw=true)

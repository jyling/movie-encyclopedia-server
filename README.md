## Description

This is the setup for the server side

For the Client-side code you can find them [Here](https://github.com/jyling/movie-encyclopedia-app)
## Requirement
- Nodejs v14.15.5
- NPM v6.14.11
- Postgres
- An Firebase account with FireStore enabled

## Installation

### Step 1: Install the package
```bash
$ npm install
```

### Step 2: You will need to modify the env file in order for the server to work
#### You will need 2 external services or database to handle data insert and image uploads
```env
DATABASE_URL="postgres://joedoe:joedoe@localhost:5432/movie_encyclopedia"

firebaseProjectId=
firebasePrivateKey=
firebaseStorageKey=
firebaseClientEmail=
```
You can get your firebase private key in [Here](https://firebase.google.com/docs/cloud-messaging/auth-server#provide-credentials-manually)

## Running the app

### For first time, you need to migrate the database with prisma
you can only use [prisma](https://www.prisma.io/docs/concepts/components/prisma-cli/installation) commands after you run npm install 

**Note:** If there's any error, create a new database with the name given in the .ENV file
```bash
$ npx prisma migrate deploy
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## License

Nest is [MIT licensed](LICENSE).

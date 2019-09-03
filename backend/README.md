# Backend

## Setup

In order to have all the secret keys set up properly, you must create a `.env` file and a `keys.json` file to the root of this directory (`./backend`).

Example setup:

In `.env`:
```
MONGO_UURL=mongodb://mongouser:mykey@somedb.mlab.com:port/db
MONGO_DURL=mongodb://mongouser:mykey@somedb.mlab.com:port/db
MONGO_URL=mongodb://mongouser:mykey@somedb.mlab.com:port/db
SCHEDULER_URL=https://scheduler-URI.amazonaws.com/endpoint
SCHEDULER_API_KEY=abcd1234
```

We use the following accounts as test logins:

  * member@test.com
  * lead@test.com

The password for all of them is `password`.

### Docker

To run with [Docker](https://www.docker.com/) (and start the frontend and backend all at once with one command):
```
docker-compose up
```

And when you're done, you can run:
```
docker-compose down -v
```

Note that if there's a change in the `package.json` file (such as a new module added into the repository), instead of running `yarn add` to re-install, just run `docker-compose up --build`. 


### Manual

You must install `dotenv-cli`:

```sh
yarn global add dotenv-cli
```

or

```sh
npm install -g dotenv-cli
```

Note: `yarn global add` will default to adding packages to `~/.yarn/bin` so by default, your terminal will not be able to locate the executable. See the [docs](https://yarnpkg.com/lang/en/docs/cli/global/) for more info. There's a couple ways to get past this, listed below:

1.  You can add yarn's default installation location to your `$PATH` environment variable, so that your terminal knows where to look for the executables. You can do this by adding `export PATH="$(yarn global bin):$PATH"` as a line in your `~/.bashrc`. Then simply quit your terminal and reopen it (or run source ~/.bashrc) and everything should work.
2.  Alternatively, you can change the default global location for yarn (`yarn config set prefix <filepath>`) and set `filepath` to something like `/usr/local` or `/usr` (or anything else in your `$PATH` that makes sense). This second method will require you to re-run the above global add command.


```sh
yarn
dotenv yarn run dev
```

### Local Mongo Setup

For development, you would need docker, or you must spin up a mongodb instance locally. Then make a `.env` file in the `/backend` folder with the following contents:

```env
MONGO_URL=mongodb://mongoadmin:secret@localhost:27017/admin
```

Afterwards, run `recreate_db.sh`:

```sh
./recreate_db.sh
```

Note: it will not run if you don't have docker running. If you don't have docker, startup mongodb running on `localhost` port `27017` and create a user: `mongoadmin` with password: `secret` with the authentication db as `admin`. Then, run `yarn populatedb` to populate the database (it connects to the database specified under `MONGO_URL` in the `.env` file).

### MLab Mongo Setup

If the mongo url is an MLab url, you don't need to do any setup.

## Testing

All the tests are in the `tests/` directory. To run them, simply run `npm run test` in the `backend/` directory.

## Deployment

We use [now](https://zeit.co/now) to easily deploy this app through the command line. Contact Hack4Impact admins to be inside the Hack4Impact Now team. The team has a couple secrets, which we use as environment variables:

- h4i-recruitment-mongo-uri
- h4i-recruitment-lead-suffix

Now Deployment details are in `now.json`

To deploy:

```sh
now
```

You're done!

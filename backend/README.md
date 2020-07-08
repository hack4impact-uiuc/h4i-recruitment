# Backend

## Setup

In order to have all the secret keys set up properly, you must create a `.env` file and a `keys.json` file to the root of this directory (`./backend`).

Example setup:

In `.env`:

```
MONGO_URL=mongodb://db:27017/endpoint
SCHEDULER_URL=https://scheduler-URI.amazonaws.com/endpoint
SCHEDULER_API_KEY=abcd1234
```

We use the following accounts as test logins:

- member@test.com
- lead@test.com

The password for all of them is `password`.

### Docker

To run with [Docker](https://www.docker.com/) (and start the frontend, backend, and database all at once with one command):

```
docker-compose up
```

And when you're done, you can run:

```
docker-compose down
```

to stop and remove all docker containers, or

```
docker-compose down -v
```

to remove all docker volumes, which also deletes all the data stored in the database.

If you previously ran `docker-compose down -v` or just cloned the repo, you'll also need to run:

```
./recreate_db.sh
```

which repopulates the database with mock data.

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

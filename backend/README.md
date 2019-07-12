## Setup
```
yarn global add dotenv-cli
```

or

```
npm install -g dotenv-cli
```

Note: `yarn global add` will default to adding packages to `~/.yarn/bin` so by default, your terminal will not be able to locate the executable. See the [docs](https://yarnpkg.com/lang/en/docs/cli/global/) for more info. There's a couple ways to get past this, listed below:
1) You can add yarn's default installation location to your `$PATH` environment variable, so that your terminal knows where to look for the executables. You can do this by adding `export PATH="$(yarn global bin):$PATH"` as a line in your `~/.bashrc`. Then simply quit your terminal and reopen it (or run source ~/.bashrc) and everything should work.
2) Alternatively, you can change the default global location for yarn (`yarn config set prefix <filepath>`) and set `filepath` to something like `/usr/local` or `/usr` (or anything else in your `$PATH` that makes sense). This second method will require you to re-run the above global add command.

Then, you must copy a `.env` file and a `keys.json` file to this folder.

```
yarn
dotenv yarn run dev
```

### Local Mongo Setup

For development, you would need docker, or you must spin up a mongodb instance locally. Then make a `.env` file in the `/backend` folder with the following contents:
```
MONGO_URL=mongodb://mongoadmin:secret@localhost:27017/admin
LEAD_SUFFIX=l
KEY_JSON=../../keys.json
```

Afterwards, run `recreate_db.sh`:
```
$ ./recreate_db.sh
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

```
now
```

You're done!

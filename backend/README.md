```
yarn global add dotenv-cli
```

or

```
npm install -g dotenv-cli
```

Then, you must copy a `.env` file and a `keys.json` file to this folder.

```
yarn
dotenv yarn run dev
```

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

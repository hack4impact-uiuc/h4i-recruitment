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

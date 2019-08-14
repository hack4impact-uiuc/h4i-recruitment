# Frontend

This is built using Next.js, which renders React server side

- We use [Prettier](https://prettier.io/) for autoformatting precommit hook and [standard](https://github.com/standard/standard) as our code style with eslint as the linter
- We use [Flow](https://flow.org) for type checking. Look [here](https://flow.org/en/docs/types/) for types
- We use [reactstrap](https://reactstrap.github.io/) for bootstrap 4 components

To start:

```sh
yarn
yarn dev
```

Before every commit, you will need to run prettier or the build will fail.

```sh
yarn format
```

To start your own authentication server, run these commands:
```sh 
npm i -g auth-infra 
auth-infra setup
```

You will be prompted from the command line to enter information set up your server. To be compliant with this repository, the roles you should use are [Director, Lead, Member, Pending]. 

For troubleshooting and more information about the server, our authentication server documentation is here: https://my-docz-project-codebrew28.hack4impact1.now.sh/ 

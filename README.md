This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install the dependencies from npm:

```bash
npm run i
```

### Update your .env file.

Copy paste the .env.example file and rename it to .env and update it with the values supplied by your EM.

### Generate the prisma types/ config:

```bash
npx prisma generate
```

### Run the development server:

```bash
npm run dev
```

## Code Quality and Linting

This project uses ESLint and Prettier to esnure code quality and consistent formatting.

### Linting Check

To manually check for linting errors, run:

```bash
npm run lint-check
```

### Auto-fix Linting Errors

To automatically fix linting errors, run

```bash
npm run lint-fix
```

### Prettier Formatting

To format your code with Prettier, run

```bash
npx prettier --write .
```

## Committing and Pushing

On commit, linting checks are automatically run to ensure code quality. Fix any errors manually or using the above commands.

On push, a secret scan is triggered to ensure no sensitive data is accidentally pushed.

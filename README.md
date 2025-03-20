# Resume Builder

The project uses AI to build resumes more faster and good quality.

## Run Locally

Clone the project

```bash
  git clone https://github.com/maarcotulio/Resume-Builder.git
```

Go to the project directory

```bash
  cd Resume-Builder
```

Install dependencies the dependencies.

```bash
  npm i
  pnpm install
```

```bash
  docker compose up
```

Set the variables in .env

```env
  DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
  AUTH_SECRET=""
```

Download the [GPT4All](https://www.nomic.ai/gpt4all), go to Settings, Application and check if the "API Server Port" is in 4891. After that you can run the project with

```bash
  npm run dev
  pnpm dev
```

## Built With

- Prisma
- Nest.js
- PostgreSQL
- Auth.js
- tRPC
- GPT4All
- Tailwind CSS
- TypeScript

````markdown
# Dawa - Next.js Application

Dawa is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), built with **TypeScript**, **Shadcn UI**, and **Jest** for testing. The project utilizes the **Next.js 15 App Router** to optimize and simplify page routing.

## Project Setup

### Prerequisites

- **Node.js** (v18.x recommended)
- **npm** (as the package manager)

### Installation

Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/kolaborateplatform/dawa.git
cd dawa
npm install
```
````

## Development Workflow

### Start the Development Server

To start the local development server, use:

```bash
npm run dev
```

This will start the server on [http://localhost:3000](http://localhost:3000).

### Linting and Formatting

For consistent code quality and readability, use the following commands:

- **Lint the code**:
  ```bash
  npm run lint
  ```
- **Fix lint issues** (auto-fixable):
  ```bash
  npm run lint:fix
  ```
- **Format the code** with Prettier:
  ```bash
  npm run format
  ```

## Project Structure

Dawa leverages the Next.js **App Router**, where all routing and page components are organized in the `app` directory. The main entry point for the application is in `app/page.tsx`. Changes to this file will automatically refresh the page during development.

### Fonts

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading. The [Geist](https://vercel.com/font) font family, provided by Vercel, is used for enhanced design consistency.

## Testing

Dawa uses [Jest](https://jestjs.io/) for unit and integration testing. Run tests using:

```bash
npm test
```

## Available Scripts

For quick reference, here are the scripts available in `package.json`:

- **Development**: `npm run dev` – Starts the Next.js development server.
- **Build**: `npm run build` – Builds the application for production.
- **Start**: `npm run start` – Starts the Next.js production server.
- **Testing**: `npm run test` – Runs Jest tests.
- **Linting**: `npm run lint` – Checks for code issues using ESLint.
- **Lint Fix**: `npm run lint:fix` – Automatically fixes lint issues where possible.
- **Formatting**: `npm run format` – Formats code using Prettier.

## Deployment

The recommended way to deploy Dawa is through [Vercel](https://vercel.com), created by the team behind Next.js. For detailed instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

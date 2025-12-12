# Kyaja-Application

This is a full-stack ecommerce application built with Next.js, TypeScript, Prisma, and Tailwind CSS. It features a complete shopping experience, from browsing products to checkout and order management.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn
- PostgreSQL or another Prisma-compatible database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/kyaja-typescript.git
    cd kyaja-typescript
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up the database:**

    - Create a `.env` file in the root of the project.
    - Add your `DATABASE_URL` to the `.env` file.
    - Run the following command to migrate the database:

    ```bash
    pnpm prisma db push
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) and [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Data Fetching:** [React Query](https://tanstack.com/query/v3/)
- **File Uploads:** [UploadThing](https://uploadthing.com/)
- **Email:** [Resend](https://resend.com/)

## Project Structure

The project is organized into the following directories:

```
.
├── app/                  # Main application code
│   ├── (backend)/        # Backend-related components and logic
│   ├── (check-out)/      # Checkout process components
│   ├── (front-end)/      # Frontend-facing pages and components
│   ├── (search)/         # Search functionality
│   └── api/              # API routes
├── components/           # Reusable UI components
├── config/               # Application configuration
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Library functions and utilities
├── prisma/               # Prisma schema and migrations
├── providers/            # Application-wide providers
├── public/               # Static assets
└── redux/                # Redux store and slices
```

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase.
- `pnpm prisma generate`: Generates the Prisma client.
- `pnpm prisma db push`: Pushes the Prisma schema to the database.

## Environment Variables

To run this project, you will need to create a `.env` file in the root of your project and add the following environment variables:

- `DATABASE_URL`: The connection string for your database.
- `NEXTAUTH_URL`: The URL of your application.
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js.

For a full list of environment variables, see the `.env.example` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

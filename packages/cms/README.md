# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick Start - local setup

This app uses PostgreSQL (`@payloadcms/db-vercel-postgres`) via the `POSTGRES_URL` env var. The provided `docker-compose.yml` spins up only the Postgres database; the app itself runs on the host with `pnpm dev`.

### Development

1. `cp .env.example .env` to copy the example environment variables (defaults already match the Docker Postgres credentials below).
2. `docker compose up -d` to start Postgres in the background.
3. `pnpm install && pnpm dev` to install dependencies and start the dev server.
4. open `http://localhost:3000` to open the app in your browser.

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

To stop the database, run `docker compose down` (add `-v` to also remove the data volume).

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

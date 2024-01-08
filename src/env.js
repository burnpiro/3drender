import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    SSL_CLIENT_IDENTITY_PASS: z.string(),
    SSL_CERT_PATH: z.string(),
    SSL_IDENTITY_PATH: z.string(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'test'
        ? z
            .preprocess(
              // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
              // Since NextAuth.js automatically uses the VERCEL_URL if present.
              str => process.env.VERCEL_URL ?? str,
              // VERCEL_URL doesn't include `https` so it cant be validated as a URL
              process.env.VERCEL ? z.string() : z.string()
            )
            .optional()
        : z.preprocess(
            // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
            // Since NextAuth.js automatically uses the VERCEL_URL if present.
            str => process.env.VERCEL_URL ?? str,
            // VERCEL_URL doesn't include `https` so it cant be validated as a URL
            process.env.VERCEL ? z.string() : z.string()
          ),
    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID:
      process.env.NODE_ENV === 'test' ? z.string().optional() : z.string(),
    GOOGLE_CLIENT_SECRET:
      process.env.NODE_ENV === 'test' ? z.string().optional() : z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SSL_CLIENT_IDENTITY_PASS: process.env.SSL_CLIENT_IDENTITY_PASS,
    SSL_CERT_PATH: process.env.SSL_CERT_PATH,
    SSL_IDENTITY_PATH: process.env.SSL_IDENTITY_PATH,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
})

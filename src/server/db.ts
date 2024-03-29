import { PrismaClient } from '@prisma/client';

import { env } from '@/env';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?${env.DB_SOCKET ? `host=${env.DB_SOCKET}&` : ''}sslmode=prefer&sslcert=${env.SSL_CERT_PATH}&sslidentity=${env.SSL_IDENTITY_PATH}&sslpassword=${env.SSL_CLIENT_IDENTITY_PASS}&sslaccept=accept_invalid_certs`,
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['query', 'error', 'warn'],
  });

console.log(`postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?${env.DB_SOCKET ? `host=${env.DB_SOCKET}&` : ''}sslmode=require&sslcert=${env.SSL_CERT_PATH}&sslidentity=${env.SSL_IDENTITY_PATH}&sslpassword=${env.SSL_CLIENT_IDENTITY_PASS}&sslaccept=accept_invalid_certs`)
if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

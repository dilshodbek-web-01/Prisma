import { registerAs } from "@nestjs/config"

declare interface DatabaseConfig {
    url?: string
}

export const dbConfig = registerAs<DatabaseConfig>('db', (): DatabaseConfig => ({
    url: process.env.DATABASE_URL ?? 'postgresql://postgres:01023dk@localhost:5432/shop'
}))
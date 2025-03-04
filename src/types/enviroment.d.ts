declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PORT: string
    DATABASE_URL: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
    JWT_SECRET: string
    JWT_EXPIRES_IN: string
    LOG_LEVEL: string
  }
}

import dotenv from 'dotenv'

dotenv.config()

interface DatabaseConfig {
  url: string
  options: {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean
  }
}

interface JwtConfig {
  secret: string
  expiresIn: string
}

interface LogConfig {
  level: string
}

interface Config {
  nodeEnv: string
  port: number
  database: DatabaseConfig
  jwt: JwtConfig
  logs: LogConfig
}

const config: Config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/postgres',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'super-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  logs: {
    level: process.env.LOG_LEVEL || 'info'
  }
}

export default config

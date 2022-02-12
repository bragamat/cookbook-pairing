import dotenv from 'dotenv'

dotenv.config()

export const knexConfig = {
  development: {
    client: 'pg',
    connection: {
      database: 'cookbook_js_dev',
      user:     process.env.PG_USER_DB,
      password: process.env.PG_PASSWORD_DB,
      port: process.env.PG_PORT_DB,
      host: process.env.PG_HOST_DB,
    },
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds'  },
  },
  test: {
    client: 'pg',
    connection: {
      database: 'cookbook_js_test',
      user:     process.env.PG_USER_DB,
      password: process.env.PG_PASSWORD_DB,
      port: process.env.PG_PORT_DB,
      host: process.env.PG_HOST_DB,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: { directory: './seeds'   },
  }
}

export default knexConfig[process.env.NODE_ENV || 'development']

import fs = require('fs');
import 'dotenv/config';
const {database_host,database_port,database_username,database_password,database_name} = process.env

fs.writeFileSync('ormconfig.json',
 JSON.stringify({
    type: 'postgres',
    host: database_host,
    port: parseInt(database_port),
    username: database_username,
    password: database_password,
    database: database_name,
    entities: ["dist/src/models/*.entity.{ts,js}"],
    migrationsTableName: 'migration',
    migrations: ['src/migration/**/*.{ts,js}'],
    cli: {
      migrationsDir: 'src/migration',
    },
    ssl: false,
  }, null, 2)
);

import 'dotenv/config';

import { DataSource } from 'typeorm';

import {
  Rota,
  Onibus,
  Parada,
  Localizacao,
  Usuario,
  UsuarioFavoritaRota,
} from './entities/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DIRECT_URL || process.env.DATABASE_URL,

  entities: [
    Rota,
    Onibus,
    Parada,
    Localizacao,
    Usuario,
    UsuarioFavoritaRota,
  ],

  migrations: ['dist/database/migrations/*.js'],

  synchronize: false,

  ssl: {
    rejectUnauthorized: false,
  },
});

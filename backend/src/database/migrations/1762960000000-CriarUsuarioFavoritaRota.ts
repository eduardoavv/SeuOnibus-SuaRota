
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriarUsuarioFavoritaRota1762960000000
  implements MigrationInterface
{
  name = 'CriarUsuarioFavoritaRota1762960000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "UsuarioFavoritaRota" (
        "usuarioId" integer NOT NULL,
        "rotaId" integer NOT NULL,
        "notificarAtraso" boolean NOT NULL DEFAULT true,
        "criadoEm" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "UsuarioFavoritaRota_pkey"
          PRIMARY KEY ("usuarioId", "rotaId"),
        CONSTRAINT "UsuarioFavoritaRota_usuarioId_fkey"
          FOREIGN KEY ("usuarioId")
          REFERENCES "Usuario"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT "UsuarioFavoritaRota_rotaId_fkey"
          FOREIGN KEY ("rotaId")
          REFERENCES "Rota"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "UsuarioFavoritaRota"
    `);
  }
}

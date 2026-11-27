import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriarEstruturaBase1762950000000 implements MigrationInterface {
  name = 'CriarTabelasIniciais1762959999000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Rota" (
        "id" SERIAL NOT NULL,
        "nome" text NOT NULL,
        "descricao" text,
        CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "Usuario" (
        "id" SERIAL NOT NULL,
        "nome" text NOT NULL,
        "email" text NOT NULL,
        "senha" text NOT NULL,
        "tipo" text NOT NULL DEFAULT 'ALUNO',
        CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Usuario_email_key" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "Onibus" (
        "id" SERIAL NOT NULL,
        "placa" text NOT NULL,
        "identificacaoRFID" text NOT NULL,
        "modelo" text NOT NULL,
        "status" text NOT NULL DEFAULT 'ATIVO',
        "rotaId" integer,
        CONSTRAINT "Onibus_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Onibus_placa_key" UNIQUE ("placa"),
        CONSTRAINT "Onibus_identificacaoRFID_key" UNIQUE ("identificacaoRFID"),
        CONSTRAINT "Onibus_rotaId_fkey"
          FOREIGN KEY ("rotaId")
          REFERENCES "Rota"("id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "Parada" (
        "id" SERIAL NOT NULL,
        "nome" text NOT NULL,
        "latitude" double precision NOT NULL,
        "longitude" double precision NOT NULL,
        "rotaId" integer,
        CONSTRAINT "Parada_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Parada_rotaId_fkey"
          FOREIGN KEY ("rotaId")
          REFERENCES "Rota"("id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "Localizacao" (
        "id" SERIAL NOT NULL,
        "latitude" double precision NOT NULL,
        "longitude" double precision NOT NULL,
        "registradaEm" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "onibusId" integer NOT NULL,
        CONSTRAINT "Localizacao_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Localizacao_onibusId_fkey"
          FOREIGN KEY ("onibusId")
          REFERENCES "Onibus"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "Localizacao_onibusId_registradaEm_idx"
      ON "Localizacao" ("onibusId", "registradaEm")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "Localizacao_onibusId_registradaEm_idx"`);
    await queryRunner.query(`DROP TABLE "Localizacao"`);
    await queryRunner.query(`DROP TABLE "Parada"`);
    await queryRunner.query(`DROP TABLE "Onibus"`);
    await queryRunner.query(`DROP TABLE "Usuario"`);
    await queryRunner.query(`DROP TABLE "Rota"`);
  }
}
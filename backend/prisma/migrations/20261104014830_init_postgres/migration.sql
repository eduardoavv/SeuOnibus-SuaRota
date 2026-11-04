-- CreateTable
CREATE TABLE "Rota" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onibus" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "identificacaoRFID" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rotaId" INTEGER,

    CONSTRAINT "Onibus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parada" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "rotaId" INTEGER,

    CONSTRAINT "Parada_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Onibus_placa_key" ON "Onibus"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Onibus_identificacaoRFID_key" ON "Onibus"("identificacaoRFID");

-- AddForeignKey
ALTER TABLE "Onibus" ADD CONSTRAINT "Onibus_rotaId_fkey" FOREIGN KEY ("rotaId") REFERENCES "Rota"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parada" ADD CONSTRAINT "Parada_rotaId_fkey" FOREIGN KEY ("rotaId") REFERENCES "Rota"("id") ON DELETE SET NULL ON UPDATE CASCADE;

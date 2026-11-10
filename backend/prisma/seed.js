
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // 1. Criar ou localizar rotas
  async function obterRota(nome, descricao) {
    const existente = await prisma.rota.findFirst({
      where: { nome },
    });

    if (existente) {
      return prisma.rota.update({
        where: { id: existente.id },
        data: { descricao },
      });
    }

    return prisma.rota.create({
      data: { nome, descricao },
    });
  }

  const rotaCentro = await obterRota(
    'Rota Centro',
    'Trajeto entre os bairros e o centro da cidade.',
  );

  const rotaUniversidade = await obterRota(
    'Rota Universidade',
    'Trajeto destinado aos estudantes universitários.',
  );

  // 2. Criar ou atualizar ônibus
  const onibus1 = await prisma.onibus.upsert({
    where: { placa: 'ABC1D23' },
    update: {
      modelo: 'Mercedes-Benz OF 1721',
      status: 'ATIVO',
      rotaId: rotaCentro.id,
    },
    create: {
      placa: 'ABC1D23',
      identificacaoRFID: 'RFID-001',
      modelo: 'Mercedes-Benz OF 1721',
      status: 'ATIVO',
      rotaId: rotaCentro.id,
    },
  });

  const onibus2 = await prisma.onibus.upsert({
    where: { placa: 'DEF4G56' },
    update: {
      modelo: 'Volare Fly',
      status: 'ATIVO',
      rotaId: rotaUniversidade.id,
    },
    create: {
      placa: 'DEF4G56',
      identificacaoRFID: 'RFID-002',
      modelo: 'Volare Fly',
      status: 'ATIVO',
      rotaId: rotaUniversidade.id,
    },
  });

  // 3. Criar ou localizar paradas
  async function obterParada(nome, latitude, longitude, rotaId) {
    const existente = await prisma.parada.findFirst({
      where: { nome, rotaId },
    });

    if (existente) {
      return prisma.parada.update({
        where: { id: existente.id },
        data: { latitude, longitude },
      });
    }

    return prisma.parada.create({
      data: { nome, latitude, longitude, rotaId },
    });
  }

  await obterParada(
    'Terminal Central',
    -8.2833,
    -35.9761,
    rotaCentro.id,
  );

  await obterParada(
    'Praça Principal',
    -8.2840,
    -35.9750,
    rotaCentro.id,
  );

  await obterParada(
    'Campus Universitário',
    -8.2900,
    -35.9800,
    rotaUniversidade.id,
  );

  await obterParada(
    'Terminal Universitário',
    -8.2920,
    -35.9820,
    rotaUniversidade.id,
  );

  // 4. Criar localizações de exemplo
  const dataRegistro = new Date('2026-11-06T12:00:00.000Z');

  async function obterLocalizacao(onibusId, latitude, longitude) {
    const existente = await prisma.localizacao.findFirst({
      where: {
        onibusId,
        registradaEm: dataRegistro,
      },
    });

    if (existente) {
      return prisma.localizacao.update({
        where: { id: existente.id },
        data: { latitude, longitude },
      });
    }

    return prisma.localizacao.create({
      data: {
        latitude,
        longitude,
        registradaEm: dataRegistro,
        onibusId,
      },
    });
  }

  await obterLocalizacao(onibus1.id, -8.2835, -35.9765);
  await obterLocalizacao(onibus2.id, -8.2905, -35.9805);

  // 5. Criar usuários com senhas criptografadas
  const senhaHash = await bcrypt.hash('SenhaDemo123!', 10);

  const aluno = await prisma.usuario.upsert({
    where: { email: 'aluno@exemplo.com' },
    update: {
      nome: 'Aluno de Exemplo',
      senha: senhaHash,
      tipo: 'ALUNO',
    },
    create: {
      nome: 'Aluno de Exemplo',
      email: 'aluno@exemplo.com',
      senha: senhaHash,
      tipo: 'ALUNO',
    },
  });

  const responsavel = await prisma.usuario.upsert({
    where: { email: 'responsavel@exemplo.com' },
    update: {
      nome: 'Responsável de Exemplo',
      senha: senhaHash,
      tipo: 'RESPONSAVEL',
    },
    create: {
      nome: 'Responsável de Exemplo',
      email: 'responsavel@exemplo.com',
      senha: senhaHash,
      tipo: 'RESPONSAVEL',
    },
  });

  // 6. Criar relações N:N de rotas favoritas
  await prisma.usuarioFavoritaRota.upsert({
    where: {
      usuarioId_rotaId: {
        usuarioId: aluno.id,
        rotaId: rotaCentro.id,
      },
    },
    update: { notificarAtraso: true },
    create: {
      usuarioId: aluno.id,
      rotaId: rotaCentro.id,
      notificarAtraso: true,
    },
  });

  await prisma.usuarioFavoritaRota.upsert({
    where: {
      usuarioId_rotaId: {
        usuarioId: aluno.id,
        rotaId: rotaUniversidade.id,
      },
    },
    update: { notificarAtraso: false },
    create: {
      usuarioId: aluno.id,
      rotaId: rotaUniversidade.id,
      notificarAtraso: false,
    },
  });

  await prisma.usuarioFavoritaRota.upsert({
    where: {
      usuarioId_rotaId: {
        usuarioId: responsavel.id,
        rotaId: rotaCentro.id,
      },
    },
    update: { notificarAtraso: true },
    create: {
      usuarioId: responsavel.id,
      rotaId: rotaCentro.id,
      notificarAtraso: true,
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar seed:', erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

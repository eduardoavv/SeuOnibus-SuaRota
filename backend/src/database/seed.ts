
import 'dotenv/config';

import * as bcrypt from 'bcrypt';

import { AppDataSource } from './data-source.js';

import {
  Rota,
  Onibus,
  Parada,
  Localizacao,
  Usuario,
  UsuarioFavoritaRota,
} from './entities/index.js';

import { StatusOnibus, TipoUsuario } from './entities/enums.js';

async function main() {
  console.log('Iniciando seed...');

  await AppDataSource.initialize();

  try {
    const rotaRepository = AppDataSource.getRepository(Rota);
    const onibusRepository = AppDataSource.getRepository(Onibus);
    const paradaRepository = AppDataSource.getRepository(Parada);
    const localizacaoRepository =
      AppDataSource.getRepository(Localizacao);
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const favoritaRepository =
      AppDataSource.getRepository(UsuarioFavoritaRota);

    // 1. Criar ou atualizar rotas
    async function obterRota(nome: string, descricao: string) {
      let rota = await rotaRepository.findOneBy({ nome });

      if (rota) {
        rota.descricao = descricao;
      } else {
        rota = rotaRepository.create({ nome, descricao });
      }

      return rotaRepository.save(rota);
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
    async function obterOnibus(
      placa: string,
      identificacaoRFID: string,
      modelo: string,
      rotaId: number,
    ) {
      let onibus = await onibusRepository.findOneBy({ placa });

      if (onibus) {
        onibus.modelo = modelo;
        onibus.status = StatusOnibus.ATIVO;
        onibus.rotaId = rotaId;
      } else {
        onibus = onibusRepository.create({
          placa,
          identificacaoRFID,
          modelo,
          status: StatusOnibus.ATIVO,
          rotaId,
        });
      }

      return onibusRepository.save(onibus);
    }

    const onibus1 = await obterOnibus(
      'ABC1D23',
      'RFID-001',
      'Mercedes-Benz OF 1721',
      rotaCentro.id,
    );

    const onibus2 = await obterOnibus(
      'DEF4G56',
      'RFID-002',
      'Volare Fly',
      rotaUniversidade.id,
    );

    // 3. Criar ou atualizar paradas
    async function obterParada(
      nome: string,
      latitude: number,
      longitude: number,
      rotaId: number,
    ) {
      let parada = await paradaRepository.findOneBy({
        nome,
        rotaId,
      });

      if (parada) {
        parada.latitude = latitude;
        parada.longitude = longitude;
      } else {
        parada = paradaRepository.create({
          nome,
          latitude,
          longitude,
          rotaId,
        });
      }

      return paradaRepository.save(parada);
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

    // 4. Criar ou atualizar localizações
    const dataRegistro = new Date('2026-11-06T12:00:00.000Z');

    async function obterLocalizacao(
      onibusId: number,
      latitude: number,
      longitude: number,
    ) {
      let localizacao = await localizacaoRepository.findOneBy({
        onibusId,
        registradaEm: dataRegistro,
      });

      if (localizacao) {
        localizacao.latitude = latitude;
        localizacao.longitude = longitude;
      } else {
        localizacao = localizacaoRepository.create({
          latitude,
          longitude,
          registradaEm: dataRegistro,
          onibusId,
        });
      }

      return localizacaoRepository.save(localizacao);
    }

    await obterLocalizacao(onibus1.id, -8.2835, -35.9765);
    await obterLocalizacao(onibus2.id, -8.2905, -35.9805);

    // 5. Criar ou atualizar usuários
    const senhaHash = await bcrypt.hash('SenhaDemo123!', 10);

    async function obterUsuario(
      nome: string,
      email: string,
      tipo: TipoUsuario,
    ) {
      let usuario = await usuarioRepository.findOneBy({ email });

      if (usuario) {
        usuario.nome = nome;
        usuario.senha = senhaHash;
        usuario.tipo = tipo;
      } else {
        usuario = usuarioRepository.create({
          nome,
          email,
          senha: senhaHash,
          tipo,
        });
      }

      return usuarioRepository.save(usuario);
    }

    const aluno = await obterUsuario(
      'Aluno de Exemplo',
      'aluno@exemplo.com',
      TipoUsuario.ALUNO,
    );

    const responsavel = await obterUsuario(
      'Responsável de Exemplo',
      'responsavel@exemplo.com',
      TipoUsuario.RESPONSAVEL,
    );

    // 6. Criar ou atualizar rotas favoritas
    async function obterFavorita(
      usuarioId: number,
      rotaId: number,
      notificarAtraso: boolean,
    ) {
      let favorita = await favoritaRepository.findOneBy({
        usuarioId,
        rotaId,
      });

      if (favorita) {
        favorita.notificarAtraso = notificarAtraso;
      } else {
        favorita = favoritaRepository.create({
          usuarioId,
          rotaId,
          notificarAtraso,
        });
      }

      return favoritaRepository.save(favorita);
    }

    await obterFavorita(aluno.id, rotaCentro.id, true);

    await obterFavorita(aluno.id, rotaUniversidade.id, false);

    await obterFavorita(responsavel.id, rotaCentro.id, true);

    console.log('Seed concluído com sucesso!');
  } finally {
    await AppDataSource.destroy();
  }
}

main().catch((erro) => {
  console.error('Erro ao executar seed:', erro);
  process.exitCode = 1;
});

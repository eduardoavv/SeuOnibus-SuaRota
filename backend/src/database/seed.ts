
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

    // 1. Criar rotas sem alterar as existentes
    async function obterRota(nome: string, descricao: string) {
      const rota = await rotaRepository.findOneBy({ nome });

      if (rota) return rota;

      return rotaRepository.save(
        rotaRepository.create({ nome, descricao }),
      );
    }

    const rotaCentro = await obterRota(
      'Rota Centro',
      'Trajeto entre os bairros e o centro da cidade.',
    );

    const rotaUniversidade = await obterRota(
      'Rota Universidade',
      'Trajeto destinado aos estudantes universitários.',
    );

    // 2. Criar ônibus sem alterar os existentes
    async function obterOnibus(
      placa: string,
      identificacaoRFID: string,
      modelo: string,
      rotaId: number,
    ) {
      const onibus = await onibusRepository.findOneBy({ placa });

      if (onibus) return onibus;

      return onibusRepository.save(
        onibusRepository.create({
          placa,
          identificacaoRFID,
          modelo,
          status: StatusOnibus.ATIVO,
          rotaId,
        }),
      );
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

    // 3. Criar paradas sem alterar as existentes
    async function obterParada(
      nome: string,
      latitude: number,
      longitude: number,
      rotaId: number,
    ) {
      const parada = await paradaRepository.findOneBy({
        nome,
        rotaId,
      });

      if (parada) return parada;

      return paradaRepository.save(
        paradaRepository.create({
          nome,
          latitude,
          longitude,
          rotaId,
        }),
      );
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

    // 4. Criar localizações sem alterar o histórico existente
    const dataRegistro = new Date('2026-11-06T12:00:00.000Z');

    async function obterLocalizacao(
      onibusId: number,
      latitude: number,
      longitude: number,
    ) {
      const localizacao = await localizacaoRepository.findOneBy({
        onibusId,
        registradaEm: dataRegistro,
      });

      if (localizacao) return localizacao;

      return localizacaoRepository.save(
        localizacaoRepository.create({
          latitude,
          longitude,
          registradaEm: dataRegistro,
          onibusId,
        }),
      );
    }

    await obterLocalizacao(onibus1.id, -8.2835, -35.9765);
    await obterLocalizacao(onibus2.id, -8.2905, -35.9805);

    // 5. Criar usuários sem alterar os existentes
    const senhaHash = await bcrypt.hash('SenhaDemo123!', 10);

    async function obterUsuario(
      nome: string,
      email: string,
      tipo: TipoUsuario,
    ) {
      const usuario = await usuarioRepository.findOneBy({ email });

      if (usuario) return usuario;

      return usuarioRepository.save(
        usuarioRepository.create({
          nome,
          email,
          senha: senhaHash,
          tipo,
        }),
      );
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

    // 6. Criar favoritos sem alterar os existentes
    async function obterFavorita(
      usuarioId: number,
      rotaId: number,
      notificarAtraso: boolean,
    ) {
      const favorita = await favoritaRepository.findOneBy({
        usuarioId,
        rotaId,
      });

      if (favorita) return favorita;

      return favoritaRepository.save(
        favoritaRepository.create({
          usuarioId,
          rotaId,
          notificarAtraso,
        }),
      );
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

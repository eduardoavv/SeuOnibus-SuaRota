import { Injectable } from '@nestjs/common';
import { CreateRotasDto } from './dto/create-rotas.dto';
import { UpdateRotasDto } from './dto/update-rotas.dto';

@Injectable()
export class RotasService {
  private rotas = [];
  private id = 1;

  create(data: CreateRotasDto) {
    const rota = { id: this.id++, ...data };
    this.rotas.push(rota);
    return rota;
  }

  findAll() {
    return this.rotas;
  }

  findOne(id: number) {
    return this.rotas.find(r => r.id === id);
  }

  update(id: number, data: UpdateRotasDto) {
    const index = this.rotas.findIndex(r => r.id === id);

    if (index === -1) return null;

    this.rotas[index] = {
      ...this.rotas[index],
      ...data,
    };

    return this.rotas[index];
  }

  remove(id: number) {
    const rota = this.rotas.find(r => r.id === id);
    this.rotas = this.rotas.filter(r => r.id !== id);
    return rota;
  }
}
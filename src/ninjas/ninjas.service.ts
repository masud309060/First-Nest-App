import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'NinjaA', weapon: 'stars' },
    { id: 2, name: 'NinjaB', weapon: 'sword' },
    { id: 3, name: 'NinjaC', weapon: 'stars' },
    { id: 4, name: 'NinjaD', weapon: 'sword' },
    { id: 5, name: 'NinjaE', weapon: 'sword' },
    { id: 6, name: 'NinjaF', weapon: 'spear' },
    { id: 7, name: 'NinjaG', weapon: 'spear' },
  ];

  getAllNinjas(weapon?: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: this.ninjas.length + 1,
      name: createNinjaDto.name,
      weapon: createNinjaDto.weapon,
    };
    this.ninjas.push(newNinja);
    return this.ninjas;
  }

  updateNinja(updateNinjaDto: UpdateNinjaDto, id: number) {
    return this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
  }

  getNinjaById(id: number) {
    const data = this.ninjas.find((ninja) => ninja.id === id);
    if (!data) throw new Error('Ninja not found');
    return data;
  }

  deleteNinja(id: number) {
    const index = this.ninjas.findIndex((n) => n.id === id);
    if (index > -1) {
      this.ninjas.splice(index, 1);
      return { data: 1 };
    }
  }
}

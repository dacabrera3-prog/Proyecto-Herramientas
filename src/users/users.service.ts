import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  // Ahora el arreglo usa la interfaz User estrictamente
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: Date.now(), // Genera un ID numérico
      ...createUserDto,
    };
    
    this.users.push(newUser);

    setTimeout(() => {
      this.users = this.users.filter(u => u.id !== newUser.id);
      console.log(`⏱️ Usuario temporal con ID ${newUser.id} expiró.`);
    }, 60000);

    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string) {
    // Usamos +id para convertir el string de la URL a number
    const user = this.users.find(u => u.id === +id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no existe o ya expiró.`);
    }
    return user;
  }

  update(id: string, updateData: any) {
    // Usamos +id para convertir el string de la URL a number
    const userIndex = this.users.findIndex(u => u.id === +id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return this.users[userIndex];
  }

  remove(id: string) {
    // Usamos +id para convertir el string de la URL a number
    const userIndex = this.users.findIndex(u => u.id === +id);
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    
    const usuarioEliminado = this.users[userIndex];
    this.users.splice(userIndex, 1);
    
    return { 
      mensaje: `Usuario temporal eliminado manualmente`, 
      usuario: usuarioEliminado 
    };
  }
}
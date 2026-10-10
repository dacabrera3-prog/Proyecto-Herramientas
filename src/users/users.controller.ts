import { Controller, Get, Post, Body, Param, Head, Options, Res, Put, Delete } from '@nestjs/common';
import type { Response } from 'express'; 
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * ==========================================
   * EXPLICACIÓN TÉCNICA: MÉTODO PUT
   * ==========================================
   * Se usa para actualizar un recurso de forma COMPLETA. 
   * Reemplaza todo el objeto con los nuevos datos enviados.
   */
  @Put(':id')
  updateCompleto(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.update(id, updateData);
  }

  /**
   * ==========================================
   * EXPLICACIÓN TÉCNICA: MÉTODO DELETE
   * ==========================================
   * Sirve para eliminar un recurso de forma definitiva. 
   * Nos permite borrar un usuario de la memoria antes de que expire.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
   * ==========================================
   * EXPLICACIÓN TÉCNICA: MÉTODO HEAD
   * ==========================================
   * Idéntico a GET, pero el servidor NUNCA devuelve el body de la respuesta.
   * Se usa para consultar metadatos ahorrando ancho de banda.
   */
  @Head()
  checkUsersStatus(@Res() res: Response) {
    const users = this.usersService.findAll();
    res.setHeader('X-Total-Users', users.length.toString());
    res.status(200).send();
  }

  /**
   * ==========================================
   * EXPLICACIÓN TÉCNICA: MÉTODO OPTIONS
   * ==========================================
   * Pregunta al servidor qué métodos HTTP están permitidos en esta ruta.
   */
  @Options()
  getOptions(@Res() res: Response) {
    // Ya no incluimos PATCH aquí
    res.setHeader('Allow', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.status(200).send({
      mensaje: "Métodos permitidos en esta ruta",
      metodos: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"]
    });
  }
}
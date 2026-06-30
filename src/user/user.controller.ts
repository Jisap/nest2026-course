import {
  Body, Controller, Get, Param, Post, Put, Delete, Query,
  NotFoundException, ParseIntPipe // Importamos Delete, NotFoundException y ParseIntPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import type { User } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userservice: UserService) { }

  // GET /user
  @Get()
  getUsers(@Query("name") name: string = ""): User[] {
    return this.userservice.findAllUsers(name);
  }

  // GET /user/:id
  @Get(":id")
  getUserById(@Param("id", ParseIntPipe) id: number): User {
    const user = this.userservice.findOneUser(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  // POST /user
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userservice.createUser(createUserDto);
  }

  // PUT /user/:id
  @Put(":id")
  updateUser(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): User {
    const updatedUser = this.userservice.updateUser(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  // DELETE /user/:id 
  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number): User {
    // En este caso, el servicio deleteUser YA lanza la NotFoundException internamente,
    // por lo que en el controlador solo nos limitamos a llamarlo y retornar el resultado.
    return this.userservice.deleteUser(id);
  }
}
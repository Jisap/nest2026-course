import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

// findOneUser(id: number);
// createUser(dto: CreateDto);
// updateUser(id: number, dto: UpdateDto);
// deleteUser(id: number);

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) { }

  private users: User[] = [
    { id: 1, name: "John", email: "john@gmail.com" },
    { id: 2, name: "Adrian", email: "adrian@gmail.com" },
  ];
  private nextId: number = 3;

  findAllUsers(name: string = "") {
    this.logger.log("Finding all users")
    return this.users.filter((user) =>
      user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    )
  }

  findOneUser(id: number): User | undefined {
    this.logger.log(`Finding user with id ${id}`)
    return this.users.find((user) => user.id === id)
  }

  createUser(dto: CreateUserDto) {
    this.logger.log("Creating user")
    const newUser: User = {
      id: this.nextId++,
      ...dto
    }
    this.users.push(newUser)
    return newUser
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user with id ${id}`)
    const user = this.findOneUser(id)
    if (!user) return null
    Object.assign(user, dto) // Actualiza todas las propiedades que vengan en el DTO
    return user
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user with id ${id}`);

    const userIndex = this.users.findIndex((user) => user.id === id);           // 1. Buscamos el índice del usuario
    if (userIndex === -1) {                                                     // 2. Si no existe, lanzamos una excepción 404
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const deletedUsers = this.users.splice(userIndex, 1);                       // 3. Eliminamos el usuario del array usando splice (modifica el array original)
    return deletedUsers[0];                                                     // 4. Retornamos el usuario eliminado 
  }
}

// UserController -> needs UserService
// UserService -> needs LoggerService
// Nest -> creates and connects everything

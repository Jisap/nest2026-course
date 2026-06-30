import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @Get("all")      // Get /user/all
// @Get(":id")      // Get /user/:id
// @Post()          // Post /user
// @Put(":id")      // Put /user/:id
// @Delete(":id")   // Delete /user/:id

@Controller('user')
export class UserController {
  // GET /user
  @Get()
  getUsers(@Query("name") name: string) {
    const users = [
      { id: 1, name: "John" },
      { id: 2, name: "Adrian" }
    ]

    if (name) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()))
    }

    return users
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return {
      id,
      name: "John Doe"
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      data: createUserDto,
      message: "User created successfully"
    }
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      data: { id, ...updateUserDto },
      message: "User updated successfully"
    }
  }
}

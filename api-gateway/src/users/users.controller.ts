import { Body, Controller, Get, HttpException, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

import { CreateUserDto } from "./dtos/CreateUser.dto";

@Controller("users")
export class UsersControllers {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) { }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.natsClient.send({ cmd: 'create-user' }, createUserDto);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await lastValueFrom(
            this.natsClient.send({ cmd: 'get-user-by-id' }, { userId: id }),
        );

        if (user) return user;
        else throw new HttpException('User Not Found', 404);
    }
}

import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";

import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UsersService } from "./users.service";

@Controller()
export class UsersMicroserviceController {
    constructor(private usersService: UsersService) { }

    @MessagePattern({ cmd: "create-user" })
    createUser(@Payload() data: CreateUserDto) {
        return this.usersService.createUser(data);
    }
    @MessagePattern({ cmd: 'get-user-by-id' })
    getUserById(@Payload() data) {
        console.log("USER SERVICE -> GETTING USER")
        return this.usersService.getUserById(data.userId);
    }

    @EventPattern('payment-created')
    paymentCreated(@Payload() data: any) {
        console.log(data);
        console.log("USER SERVICE -> UPDATED PAYMENT!!")
    }

}
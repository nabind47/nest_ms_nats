import { Module } from "@nestjs/common";

import { UsersControllers } from "./users.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";

@Module({
    imports: [NatsClientModule],
    controllers: [UsersControllers],
    providers: []
})
export class UsersModule { }
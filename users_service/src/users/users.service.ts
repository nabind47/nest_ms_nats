import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    createUser(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    getUserById(userId: string) {
        return this.usersRepository.findOne({
            where: { id: userId },
            relations: ['payments'],
        });
    }
}
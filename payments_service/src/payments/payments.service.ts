import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from 'src/typeorm/entities/User';
import { Payment } from 'src/typeorm/entities/Payment';

import { CreatePaymentDto } from './dtos/CreatePayment.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    ) { }

    async createPayment({ userId, ...createPaymentDto }: CreatePaymentDto) {
        console.log("PAYMENT SERVICE -> GETTING USER!!")
        const user = await lastValueFrom<User>(
            this.natsClient.send({ cmd: 'get-user-by-id' }, { userId }),
        );

        if (user) {
            const newPayment = this.paymentsRepository.create({
                ...createPaymentDto,
                user,
            });
            return this.paymentsRepository.save(newPayment);
        }
        return null;
    }
}

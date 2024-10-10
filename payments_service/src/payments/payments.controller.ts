import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsMicroserviceController {
    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private paymentsService: PaymentsService,
    ) { }


    @EventPattern('create-payment')
    async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
        const payment =
            await this.paymentsService.createPayment(createPaymentDto);

        console.log("PAYMENT SERVICE -> PAYMENT CREATED!!")
        if (payment) this.natsClient.emit('payment-created', payment);
        return payment
    }
}
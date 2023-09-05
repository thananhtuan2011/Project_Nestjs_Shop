import { Controller, Get } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Controller('test-kafka')
export class TestKafkaController {

    constructor(private readonly producer_services: ProducerService) {

    }
    @Get()
    async getHello() {

        return this.producer_services.produce(
            {
                topic: "test",
                messages: [
                    {
                        value: "Xin chào kafka nestjs"
                    }

                ]
            }
        )
    }

}

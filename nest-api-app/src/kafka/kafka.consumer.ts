import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
@Injectable()
export class KafkaConsumer implements OnModuleInit {

    constructor(private readonly consumer_services: ConsumerService) {

    }
    async onModuleInit() {
        // await this.consumer_services.consum({ topics: ["test"] }, {
        //     eachMessage: async ({ topic, partition, message }) => {
        //         console.log({
        //             topic: topic.toString(),
        //             partition: partition.toString(),
        //             value: message.value.toString()

        //         })
        //     }
        // })
    }

}
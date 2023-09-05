import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {


    private readonly kafka = new Kafka(
        {
            brokers: ['localhost:9092', 'localhost:9101'],
        }
    );
    private readonly producer: Producer = this.kafka.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce(pr: ProducerRecord) {
        await this.producer.send(pr);
    }
    async onApplicationShutdown() {
        await this.producer.disconnect();
    }

}

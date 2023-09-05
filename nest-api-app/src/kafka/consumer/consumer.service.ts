import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka, } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {



    private readonly kafka = new Kafka(
        {
            brokers: ['localhost:9092', 'localhost:9101'],
        }
    );
    private readonly consumer: Consumer[] = [];

    onApplicationShutdown(signal?: string) {
        for (const consum of this.consumer) {
            consum.disconnect();
        }
    }

    async consum(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: "nestjs-kafka" })
        await consumer.connect()
        await consumer.subscribe(topic)
        await consumer.run(config)
        this.consumer.push(consumer)
    }


    //   async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    //     const consumer = new KafkajsConsumer(
    //       topic,
    //       this.databaserService,
    //       config,
    //       this.configService.get('KAFKA_BROKER'),
    //     );
    //     await consumer.connect();
    //     await consumer.consume(onMessage);
    //     this.consumers.push(consumer);
    //   }

}

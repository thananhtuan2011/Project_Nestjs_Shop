import { Module } from '@nestjs/common';
import { ProducerService } from '../producer/producer.service';
import { TestKafkaController } from './test-kafka/test-kafka.controller';
import { ConsumerService } from '../consumer/consumer.service';
import { KafkaConsumer } from '../kafka.consumer';

@Module({

    providers: [ProducerService, ConsumerService, KafkaConsumer],
    exports: [ProducerService, ConsumerService],
    controllers: [TestKafkaController]


})
export class KafkaModule {

}

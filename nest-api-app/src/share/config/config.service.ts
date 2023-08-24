import { Injectable } from '@nestjs/common';
import { Config } from './config.enum';

@Injectable()
export class ConfigService {

    static connectionstring: string = process.env[Config.MONGO_URL]
}

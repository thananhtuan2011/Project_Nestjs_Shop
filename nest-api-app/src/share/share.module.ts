import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { MapperService } from './mapper/mapper.service';

@Module({
  providers: [ConfigService, MapperService],
  exports: [MapperService, ConfigService]
})
export class ShareModule { }

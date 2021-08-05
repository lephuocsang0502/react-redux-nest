import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { RequestController } from './controller/request/request.controller';
import { RequestEntryEntity } from './model/request-entry.entity';
import { RequestService } from './service/request/request.service';


@Module({

    imports:[
        TypeOrmModule.forFeature([RequestEntryEntity]),
        AuthModule,
        UserModule
    ],

    controllers: [RequestController],
    providers:[RequestService]
})
export class RequestModule {}

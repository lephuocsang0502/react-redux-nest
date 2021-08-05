import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CartController } from './cart.controller';
import { CartEntity } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([CartEntity]),
    AuthModule,
    UserModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}

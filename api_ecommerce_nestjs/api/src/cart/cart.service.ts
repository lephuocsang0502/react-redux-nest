import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { Cart, Item } from './cart.interface';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>,
        private userService: UserService
    ) { }

    create(user: User, cartEntry: Cart): Observable<Cart> {
        cartEntry.user = user;
        console.log("user id: ", user.id)
        return from(this.findByUserId(user.id).pipe(
            switchMap((cart: Cart) => {
                console.log(`cart of user id ${user.id} is ${cart}`);
                if (!cart) {
                    return from(this.cartRepository.save(cartEntry));
                }
                else{
                    
                }
            })
        ))


    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    findByUserId(id: number): Observable<Cart> {
        return from(this.cartRepository.findOne({
            where: {
                user: id
            },
            relations: ['user']
        })).pipe(map((cart: Cart) => cart));
    }

    findByProductId(id: number): Observable<Item> {
        return from(this.cartRepository.findOne({
            where: {
                cartItems: id
            },
            relations: ['user']
        })).pipe(map((item: Item) => item));
    }
}

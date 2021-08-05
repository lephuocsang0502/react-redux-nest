import { UserEntity } from "src/user/models/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { Item } from "./cart.interface";


@Entity('cart_entity')
export class CartEntity{

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type => UserEntity, user => user.cartEntries)
    user:UserEntity;

    @Column('jsonb')
    cartItems:Item[];
    
    @Column({type:'timestamp',default: ()=>"CURRENT_TIMESTAMP"})
    createdAt:Date;

}
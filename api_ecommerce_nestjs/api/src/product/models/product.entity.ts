import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "src/user/models/user.entity";
import { CategoryEntity } from "src/category/model/category.entity";
import { Image } from "src/request/model/image.interface";

@Entity('product_entity')
export class ProductEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string;

    @Column()
    slug:string;

    @Column()
    price: number;

    @Column()
    quantity:number;

    @Column({default: ''})
    description:string;

    @Column('text', { array: true })
    productPictures:string[];

    @Column({type:'timestamp',default: ()=>"CURRENT_TIMESTAMP"})
    createdAt:Date;

    @Column({type:'timestamp',default: ()=>"CURRENT_TIMESTAMP"})
    updatedAt:Date;

    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt=new Date;
    }

    @Column({default:0})
    likes:number;


    @Column({nullable:true})
    publishedDate:Date;

    @Column({nullable:true})
    isPublished:boolean;

    
    @ManyToOne(type => UserEntity, user => user.requestEntries)
    createdBy: UserEntity
    
    @ManyToOne(type=> CategoryEntity,category=>category.productEntries)
    category: CategoryEntity


    
}
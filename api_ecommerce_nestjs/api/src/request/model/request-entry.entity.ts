import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "src/user/models/user.entity";

@Entity('request_entity')
export class RequestEntryEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    spokeCo:string;

    @Column()
    slug:string;

    @Column()
    link: string;

    @Column({nullable:true})
    status:number;

    @Column({default: ''})
    description:string;

    @Column({default: ''})
    body:string;

    @Column({nullable: true})
    headerImage:string;

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

    @ManyToOne(type=> UserEntity,user=>user.requestEntries)
    // @Column()
    author: UserEntity


    
}
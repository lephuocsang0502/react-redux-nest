import { ProductEntity } from "src/product/models/product.entity";
import { UserEntity } from "src/user/models/user.entity"
import { BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity('category_entity')
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({ nullable: true })
    parentId:string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    categoryImage: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @ManyToOne(type => UserEntity, user => user.requestEntries)
    createdBy: UserEntity

    @OneToMany(type=>ProductEntity, productEntries=>productEntries.category)
    productEntries: ProductEntity[];



}
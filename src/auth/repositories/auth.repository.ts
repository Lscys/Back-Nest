import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from '../entities/user.entity'

@Injectable()   
export class AuthRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findAllUsers(): Promise<User[]> 
    {
        return this.userRepository.find();
    }

    async findOneByEmail(email: string): Promise<User | null> 
    {
        return this.userRepository.findOne({ where: { email } });
    }

    create(user: Partial<User>): User
    {
        return this.userRepository.create(user);
    }

    async save(user: User): Promise<User>  
    {
        return this.userRepository.save(user);
    }

    async findOne(id: number): Promise<User | null> 
    {
        return this.userRepository.findOne({ where: { id } });
    }

}
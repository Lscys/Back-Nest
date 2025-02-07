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


    async findOneByEmail(email: string): Promise<User | null> 
    {
        return this.userRepository.findOne({ where: { email } });
    }

}
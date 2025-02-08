import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "../repositories/auth.repository";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.authRepository.findOneByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas')
        } 

        const payload = { email: user.email, sub: user.id }
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.authRepository.create({
            email: registerDto.email,
            password: hashedPassword,
            name: registerDto.name,
        });
        return this.authRepository.save(user);  
    }

    async getProfile(userId: number): Promise<Partial<User>> {
        const user = await this.authRepository.findOne(userId);
        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }
        const { password, ...result } = user;

        return result
    }

    async findAllUsers(): Promise<User[]> {
        return this.authRepository.findAllUsers();
    }

}
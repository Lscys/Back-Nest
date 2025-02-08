import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/login.dto"
import { RegisterDto } from "../dto/register.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { Public } from "../decorators/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async findAllUsers() {
        return this.authService.findAllUsers();
    }

}


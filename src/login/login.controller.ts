import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async login(@Body() loginDto: CreateLoginDto, @Res() response,) {
    try {
      const { email, password } = loginDto;
      console.log(loginDto, 'loginDto');

      const user: any = await this.loginService.findUser(email);
      console.log(user, 'user')
      if (!user || user.password !== password) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return response.status(HttpStatus.OK).json({
        message: 'Login successful', user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}

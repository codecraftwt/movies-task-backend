import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';

@Injectable()
export class LoginService {

  constructor(@InjectModel('User') private userModel: Model<IUser>) { }

  async findUser(email: string) {
    console.log(email, 'email');

    const existingUser = await this.userModel.find({email});
    console.log(existingUser, 'existingUser');

    if (!existingUser) {
      throw new NotFoundException(`User with email #${email} not found`);
    }
    return existingUser[0];
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}

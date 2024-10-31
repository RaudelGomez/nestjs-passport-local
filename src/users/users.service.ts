import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  async register(createUserDto: CreateUserDto) {
    const userExist = await this.prismaService.user.findUnique({where: {email: createUserDto.email}})
    if(userExist){
      throw new BadRequestException('User already exist');
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.prismaService.user.create({data: {...createUserDto, password: hashPassword, roles: ['USER']}})
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const userExist = await this.prismaService.user.findUnique({where: {email: loginUserDto.email}});
    if(!userExist){
      throw new BadRequestException('You are not authorized');
    }
    const passIsMatch = await bcrypt.compare(loginUserDto.password, userExist.password);
    if(!passIsMatch){
      throw new BadRequestException ('Your password is wrong');
    }
    const {name, email, ...result} = userExist;
    const payload = {sub: userExist.email, roles: userExist.roles}
    return payload;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

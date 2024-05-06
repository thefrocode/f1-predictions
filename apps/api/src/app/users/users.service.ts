import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  constructor(private playersService: PlayersService) {}

  async createLocalUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    const createdUser = await this.usersRepository.save(newUser);
    return this.playersService.create({
      ...createUserDto,
      user_id: createdUser.id,
    });
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
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

import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserEntity } from 'src/modules/entities/user.entity';

@Injectable()
export class UsersService {
  async create(user: UserDto): Promise<UserEntity> {
    return await UserEntity.create<UserEntity>(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await UserEntity.findOne<UserEntity>({ where: { email } });
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await UserEntity.findOne<UserEntity>({ where: { id } });
  }
}

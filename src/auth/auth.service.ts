import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ email });
    if (user && (await compare(password, user.password))) {
      const payload = { id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async register(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const hashedPassword = await hash(password, 11);
    const user = new this.userModel({ email, password: hashedPassword });
    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}

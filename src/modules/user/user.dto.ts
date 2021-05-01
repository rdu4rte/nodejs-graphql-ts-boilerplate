import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserDto {
  @Field()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @MinLength(6)
  password: string

  @Field()
  @IsString()
  @MinLength(6)
  password_confirm: string
}
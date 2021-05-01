import { IsNotEmpty, IsString } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class CredentialsDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string
}

@ObjectType()
export class JwtResponse {
  @Field()
  @IsString()
  token: string
}
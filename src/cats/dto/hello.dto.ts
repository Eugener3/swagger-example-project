import { ApiProperty } from "@nestjs/swagger";

export class HelloDto {
    @ApiProperty({ description: 'Hello message', example: 'Hello, cats!' }  )
    helloMessage: string;
}
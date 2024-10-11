import { ApiProperty } from "@nestjs/swagger";

export class ImageDto {
    @ApiProperty({
		description: 'A photo of an insanely delicious latte',
		type: 'string',
		format: 'binary',
	})
	readonly image: string;
}
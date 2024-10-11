import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { ImageDto } from './dto/image.dto';
import { imageConfig } from 'src/common/configs/multer-image.config';

// @ApiExcludeController() // Excludes the entire controller from the documentation.
@ApiTags('Users') // Groups endpoints under specified tags in the Swagger UI.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access-token') // Adds authentication using Bearer tokens.
  // Describes the operation
  @ApiOperation({
    summary: 'Get a typical message', // Brief description of the operation.
    description: 'Returns typical message, nothing interesting', // Detailed description of the operation.
    operationId: 'VERY_BORING_MESSAGE', // The unique identifier of the transaction.
  })
  // Describes the possible responses of the controller method.
  @ApiResponse({
    status: HttpStatus.OK, // HTTP status
    description: 'Get typical answer.', // Response description.
    type: String, // Data model returned in the response.
  })
  // Describes the route parameters
  @ApiParam({
    name: 'id',
    description: 'The id of the user',
    type: 'integer',
    required: false,
  })
  // Describes the parameters of the request.
  @ApiQuery({
    name: 'page',
    description: 'The page number',
    type: Number,
    required: false,
  })
  // Describes the request body for the POST, PUT, and PATCH methods.
  @ApiBody({
    description: 'What do you want?',
    schema: {
      type: 'object',
      properties: {
        what: {
          type: 'string',
          example: 'One latte, please.',
        },
      },
    },
    required: true,
  })
  @ApiConsumes(
    'application/json',
    'multipart/form-data',
    'application/x-www-form-urlencoded',
  )
  @Post('what')
  getTypicalAnswer(): string {
    return this.usersService.getTypicalAnswer();
  }

  @ApiOperation({ summary: 'Why are you bothering me?' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A very massive object',
    // Response pattern (if no type is used).
    schema: {
      type: 'string', // Data model returned in the response.
      example: 'Just a typical asnwer.', // Example value.
    },
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'A very massive object',
    type: [Object],
    links: {
      self: {
        description: 'Link to this resource',
        operationId: 'VERY_BORING_MESSAGE_BYE',
        parameters: {
          id: {
            description: 'The id of the resource',
            type: 'integer',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Its OK, just another typical answer.',
    type: [Array],
    isArray: true,
  })
  @ApiParam({
    name: 'Just enum param',
    type: 'enum',
    enum: ['FIRST', 'SECOND', 'THIRD'],
    required: true,
  })
  // Specifies which MIME types the method consumes
  @Get('why')
  getByeHumanity(): string {
    return this.usersService.getTypicalAnswer();
  }

  @ApiOperation({
    summary: 'Get a typical phono',
  })
  @ApiConsumes(
    'application/json',
    'multipart/form-data',
    'application/x-www-form-urlencoded',
  )
  @UseInterceptors(FileInterceptor('image', imageConfig))
  @Post('cheese')
  putTypicalPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ImageDto,
  ): object {
    return {
      type: file ? file.mimetype : 'No file provided',
      result: this.usersService.getTypicalAnswer(),
    };
  }
}

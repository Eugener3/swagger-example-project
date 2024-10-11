import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { HelloDto } from './dto/hello.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
 
    ) {}
    @ApiOperation({ summary: 'Cat hello message'  })
    @Post('meow')
    getMeow(@Body() dto: HelloDto): string {
      return this.catsService.getMeow();
    }

    @ApiOperation({ summary: 'Cat bye message'  })
    @Get('bye-meow')
    getByeMeow(): string {
      return this.catsService.getMeow();
    }
}

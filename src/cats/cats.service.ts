import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    getMeow(): string {
        return 'Its meow world!';
    }
}

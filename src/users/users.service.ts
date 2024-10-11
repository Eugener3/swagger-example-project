import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getTypicalAnswer(): string {
        return 'Just a typical asnwer.';
    }
}

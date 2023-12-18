import { Injectable } from "@nestjs/common";


@Injectable()
export class StringService {
    CHARACTERS ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    generateString(length: number) {
        let result = ' ';
        const charactersLength = this.CHARACTERS.length;
        for ( let i = 0; i < length; i++ ) {
            result += this.CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
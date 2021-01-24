export class ErrorHandler {
    static handleError(code: number) {
        switch (code) {
            case 0:
                throw new Error('Operand missing');
            case 1:
                throw new Error('2nd operand missing');
            case 3:
                throw new Error('Invalid Operand');
            case 4:
                throw new Error('Accepts only 8byte (ie XX where 0 <= X <= F)');
        }
    }
}

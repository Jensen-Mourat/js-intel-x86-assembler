export const rotate = (op: string): string => {
    const length = op.length;
    if(length % 2 !== 0){
        op = '0' + op;
    }
    if(op.length <= 2){
        return op;
    }
    let rotatedString = '';
    for (let i = op.length - 1; i > 0 ; i-=2){
        rotatedString += op.charAt(i-1) + op.charAt(i)
    }
    return rotatedString;
}

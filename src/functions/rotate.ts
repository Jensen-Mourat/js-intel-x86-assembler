export const rotate = (op: string): string => {
    if(op.length <= 2){
        return op;
    }
    let rotatedString = '';
    for (let i = op.length - 1; i > 0 ; i-=2){
        rotatedString += op.charAt(i-1) + op.charAt(i)
    }
    return rotatedString;
}

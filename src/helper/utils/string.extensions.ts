interface String {
    removeBrackets(bracketType?: '[' | '(' | '{'): string;
}

String.prototype.removeBrackets = function (bracketType='['): string {
    switch (bracketType) {
        case '[':
            return this.replace('[', '').replace(']', '');
        case '(':
            return this.replace('(', '').replace(')', '');
        case '{':
            return this.replace('{', '').replace('}', '');
    }
};

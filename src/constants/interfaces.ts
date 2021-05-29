export interface OpCode {
    opCode: string;
    modRmByte?: string;
    length?: 'b' | 'd' | 'w';
    isSigned?: boolean;
    registerCode?: string;
}

export type types = 'r32' | 'r8' | 'r16' | 'm32' | 'm8' | 'm16' | 'imm32' | 'imm8' | 'imm16';

export interface OperandType {
    type: types;
    isMemory?: boolean;
    isDisplacementOnly?: boolean;
    isRegisterOnly?: boolean;
    register?: string;
    constant?: string;
    displacement?: string;
    register2?: string;
    is16Bit?: boolean;
    isAddressMode?: boolean;
    value?: string;
    isNegativeDisp?: boolean;
}

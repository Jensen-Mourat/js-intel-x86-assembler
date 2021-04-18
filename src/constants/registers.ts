import {mergeSets} from '../helper/mergeSets';

export const EightBitRegisters = new Set(['al', 'bl', 'cl', 'dl', 'ah', 'bh', 'ch', 'dh']);
export const SixteenBitRegisters = new Set(['ax', 'bx', 'cx', 'dx', 'sp', 'bp', 'si', 'di']);
export const ThirtyTwoBitRegisters = new Set(['eax', 'ebx', 'ecx', 'edx', 'esp', 'ebp', 'esi', 'edi']);
export const REGISTERS = mergeSets(EightBitRegisters, ThirtyTwoBitRegisters, SixteenBitRegisters);
export const REGISTER_CODE = new Map([
    ['al', 0], ['cl', 1], ['dl', 2], ['bl', 3], ['ah', 4], ['ch', 5], ['dh', 6], ['bh', 7], ['eax', 0], ['ecx', 1], ['edx', 2], ['ebx', 3], ['esp', 4], ['ebp', 5], ['esi', 6], ['edi', 7]
]);

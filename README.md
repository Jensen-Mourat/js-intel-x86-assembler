# js-intel-x86-assembler
An Intel x86 assembler, generates opCodes from assembly. **SUPPORTS ONLY A LIMITED INSTRUCTION SET**

Feel free to contribute!

# Usage
Import the `Assembler` class and call 

``` 
new Assembler().getMachineCode(instructions: Instruction[])
```
# Interface
```
interface Instruction {
    label?: string;
    operation: string;
    ptrType?: PtrType;
    operand1?: string;
    operand2?: string;
}

type PtrType = 'byte' | 'word' | 'dword';

```

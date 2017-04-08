import { CommandCompiler } from './CommandCompiler';

export class CPPCompiler extends CommandCompiler
{
    constructor()
    {
        super('C++', 'cpp', 'src.cpp');
        this.CompileFunction = (_, code) => {
            const file = this.createTmpFile(code);
            
            const compileOutput = this.executeCommand(`g++ -O2 -std=c++1z -w -o tmp/a.out ${file}`)[0].toString();
            const runtimeOutput = this.executeCommand('./tmp/a.out')[0].toString();

            console.log(compileOutput.toString());

            return {
                Output: runtimeOutput,
                Error: (!compileOutput || !compileOutput.length) ? compileOutput.toString() : undefined,
                Code: code,
                Compiler: this,
                isError: compileOutput.length !== 0
            };
        };

        this.PreprocessFunction = code => {
            return `#include <iostream>
#include <algorithm>
#include <vector>
#include <functional>

${code}`;
        };
    }
}
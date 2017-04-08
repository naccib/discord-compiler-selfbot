import { CommandCompiler } from './CommandCompiler';

export class TypeScriptCompiler extends CommandCompiler
{
    constructor()
    {
        super('TypeScript', 'ts', 'tmp.ts');

        this.CompileFunction = (compiler, code) => {
            let file = this.createTmpFile(code);
            const [runtimeOutput, hasFailed] = this.executeCommand(`ts-node ${file}`);  

            return {
                Code: code,
                Compiler: this,
                isError: hasFailed,
                Error: runtimeOutput.toString(),
                Output: runtimeOutput.toString()
            };
        };
    }
}
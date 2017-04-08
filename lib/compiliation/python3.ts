import { CommandCompiler } from './CommandCompiler';

export class Python3Compiler extends CommandCompiler
{
    constructor()
    {
        super('Python 3', 'py', 'tmp.py');

        this.CompileFunction = (compiler, code) => {
            let file = this.createTmpFile(code);
            const [runtimeOutput, hasFailed] = this.executeCommand(`python3 ${file}`);  

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
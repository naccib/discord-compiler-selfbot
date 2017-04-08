import { CommandCompiler } from './CommandCompiler';

export class Python2Compiler extends CommandCompiler
{
    constructor()
    {
        super('Python 2', 'py', 'tmp.py');

        this.CompileFunction = (compiler, code) => {
            let file = this.createTmpFile(code);
            const [runtimeOutput, hasFailed] = this.executeCommand(`python ${file}`);  

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
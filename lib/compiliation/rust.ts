import { CommandCompiler } from './CommandCompiler';

export class RustCompiler extends CommandCompiler
{
    constructor()
    {
        super('Rust', 'rs', 'src.rs');
        this.CompileFunction = (_, code) => {
            const file = this.createTmpFile(code);
            const outFile = file.replace('.rs', '');
            
            const compileOutput = this.executeCommand(`rustc ${file} -o ${outFile}`)[0].toString();
            const runtimeOutput = this.executeCommand(`./${outFile}`)[0].toString();

            return {
                Output: runtimeOutput,
                Error: (!compileOutput || !compileOutput.length) ? compileOutput.toString() : undefined,
                Code: code,
                Compiler: this,
                isError: compileOutput.length !== 0
            };
        };
    }
}
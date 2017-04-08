import { CommandCompiler } from './CommandCompiler';

export class RubyCompiler extends CommandCompiler
{
    constructor()
    {
        super('Ruby', 'rb', 'tmp.rb');

        this.CompileFunction = (_, code) => {
            let file = this.createTmpFile(code);
            let [runtimeOutput, hasFailed] = this.executeCommand(`ruby ${file}`);

            return {
                Output :runtimeOutput.toString(),
                isError: hasFailed,
                Code: code,
                Error: runtimeOutput.toString(),
                Compiler: this
            };
        };
    }


}
import { Compiler } from "./compiler";
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

/**
 * A compiler that compiles code by running commands.
 */
export class CommandCompiler extends Compiler
{
    /**
     * Compile commands.
     */
    private TempFileName : string;

    constructor(langName : string, markdownHighlight : string, tmpFileName? : string)
    {
        super(langName, markdownHighlight);

        if(tmpFileName)
            this.TempFileName = tmpFileName;
        else
            this.TempFileName = langName;

        if(!existsSync('tmp'))
            mkdirSync('tmp');
    }

    /**
     * Creates a temporary file and returns the name of it.
     * @param content The content to be written.
     */
    protected createTmpFile(content : string) : string
    {
        const path = join('tmp', this.TempFileName);
        writeFileSync(path, content, {
            encoding: 'utf-8'
        });

        return path;
    }

    /**
     * Executes a command.
     * @param command The command to be executed.
     * @returns A buffer, representing the command output, and a boolean representing wether the command has failed or not.
     */
    protected executeCommand(command : string) : [Buffer, boolean]
    {
        try
        {
            return [execSync(command), false];
        }
        catch(e)
        {
            return [e, true];
        }
    }
}
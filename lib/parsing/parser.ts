import { Message } from 'discord.js';
import { Command } from './command';

/**
 * Handles message parsing.
 */
export class Parser
{
    private Commands : Command[];
    private Prefixes : string[]

    constructor()
    {
        this.Commands = [];
        this.Prefixes = ['&', '!'];
    }

    /**
     * Parses a message and invokes a command.
     * @param msg The message to be parsed.
     */
    public Parse(msg : Message)
    {
        const matches = msg.content.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);

        if(!matches)
        {
            console.log('Null matches... aborting command.');
            return;
        }

        const identifier = this.removePrefix(matches[0]) as string;
        const args = matches.slice(1, matches.length);

        console.log(`Found command with identifier ${identifier}.`);

        this.Commands.forEach(command => {
            if(command.Identifiers.indexOf(identifier) !== -1)
            {
                command.CallbackFunction(msg, args.join(' '));
            }
        });
    }

    /**
     * Adds a new command to the command list.
     * @param identifiers The command identifiers.
     * @param callbackFunc The function that is called back when a command is triggered.
     */
    public addCommand(identifiers : string[], callbackFunc : (msg : Message, code : string) => void) : Parser
    {
        this.Commands.push(new Command(identifiers, callbackFunc));
        return this;
    }

    public addCommandRaw(command : Command)
    {   
        this.Commands.push(command);
        return this;
    }

    /**
     * Finds a prefix and returns the indentifier without the prefix.
     * @param str The string to search the prefix for.
     */
    private removePrefix(str : String) : String
    {
        let identifier = str;

        this.Prefixes.forEach(prefix => {
            if(str.startsWith(prefix))
                identifier = str.slice(prefix.length, str.length - prefix.length + 1);
        });

        return identifier;
    }
}
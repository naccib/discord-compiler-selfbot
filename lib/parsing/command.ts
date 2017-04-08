import { Message } from 'discord.js'; 

/**
 * Represents a command.
 */
export class Command
{
    /**
     * The function that is called back when a command is triggered.
     */
    public CallbackFunction : (msg : Message, code : string) => void;

    /**
     * The command identifiers.
     */
    public Identifiers : string[];

    /**
     * Creates a new Command.
     * @param identifiers The command identifiers.
     * @param callbackFunc The function that is called back when a command is triggered.
     */
    constructor(identifiers : string[], callbackFunc : (msg : Message, code : string) => void)
    {
        this.Identifiers = identifiers;
        this.CallbackFunction = callbackFunc;
    }
}
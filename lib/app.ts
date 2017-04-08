import { Client } from 'discord.js';
import { Token }  from './token';
import { Parser } from './parsing/parser';

import { CPPCommand, RubyCommand, Python2Command, Python3Command, TSCCommand, RSCommand } from './commands';

let client = new Client();

client.on('ready', () => {
    console.log(`Connected as ${client.user.username}.`)
});

let parser = new Parser()
.addCommandRaw(CPPCommand)
.addCommandRaw(RubyCommand)
.addCommandRaw(Python2Command)
.addCommandRaw(Python3Command)
.addCommandRaw(TSCCommand)
.addCommandRaw(RSCommand);

client.on('message', message => {
    if(message.author.id === client.user.id)
    {
        console.log(`Got message at ${message.guild.name}.`);
        parser.Parse(message);
    }
});

client.login(Token);
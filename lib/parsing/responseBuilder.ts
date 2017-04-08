import { Message, RichEmbed } from 'discord.js';
import { Command } from './command';
import { CompileResult } from '../compiliation/compileResult';
import { Compiler } from '../compiliation/compiler';

/**
 * Responsible to to build pretty responses.
 */
export class ResponseBuilder
{
    /**
     * Generates a success embed.
     * @param result The compiliation result.
     * @param compiler The compiler.
     */
    buildSuccess(result : CompileResult, msg : Message)
    {
        return new RichEmbed({
            title: 'Compiliation Succeeded :thumbsup:',
            description: `Compiled for ${result.Compiler.LanguageName}.`,
            color: 0x24FA73
        })
        .addField('Input', `\`\`\`${result.Compiler.MarkdownHighlight}\n${msg.content}\`\`\``)
        .addField('Output', `\`\`\`${result.Output}\`\`\``)
        .setFooter(`Took ${result.CompileTime[0]}.${result.CompileTime[1]} seconds to compile.`)
    }

    /**
     * Generates a failure embed.
     * @param result The compiliation result.
     * @param compiler The compiler.
     */
    buildError(result : CompileResult, msg : Message)
    {
        return new RichEmbed({
            title: 'Compiliation Failed :rotating_light:',
            description: `Compiled for ${result.Compiler.LanguageName}.`,
            color: 0xFA2441
        })
        .addField('Input', `\`\`\`${result.Compiler.MarkdownHighlight}\n${msg.content}\`\`\``)
        .addField('Error', `\`\`\`${result.Error}\`\`\``);
    }

    /**
     * Responds with an apropriated response.
     * @param message The message that originated this response.
     * @param result The compiliation result.
     * @param compiler The compiler.
     */
    sendResponse(message : Message, result : CompileResult)
    {
        const embed = result.isError ? this.buildError(result, message) :  this.buildSuccess(result, message);

        message.delete().then(msg => {
            msg.channel.sendEmbed(embed);
        }).catch(reason => {
            console.log(`Could not send message.\n${reason}`);
        });
    }
}
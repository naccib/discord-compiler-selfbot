import { CPPCompiler } from './compiliation/cpp';
import { RubyCompiler } from './compiliation/ruby';
import { Python2Compiler } from './compiliation/python2';
import { Python3Compiler } from './compiliation/python3';
import { TypeScriptCompiler } from './compiliation/typescript';
import { RustCompiler } from './compiliation/rust';
import { Compiler } from './compiliation/compiler';

import { Command } from './parsing/command';
import { ResponseBuilder } from './parsing/responseBuilder';

const Builder = new ResponseBuilder();

const cpp = new CPPCompiler();
const rb  = new RubyCompiler()
const py3 = new Python3Compiler();
const py2 = new Python2Compiler();
const tsc = new TypeScriptCompiler();
const rs  = new RustCompiler();

/**
 * Builds a new Command, given a compiler and the command identifiers.
 * @param compiler The compiler associated with this command.
 * @param identifiers The command identifiers.
 */
const buildCommand = (compiler : Compiler, identifiers : string[]) : Command =>
    new Command(identifiers, (msg, code) => {
        Builder.sendResponse(msg, compiler.compile(code));
    })

export const CPPCommand     = buildCommand(cpp, ['cpp', 'c++']);
export const RubyCommand    = buildCommand(rb,  ['ruby', 'rb']);
export const Python2Command = buildCommand(py2, ['py2', 'python2']);
export const Python3Command = buildCommand(py3, ['py3', 'python3']);
export const TSCCommand     = buildCommand(tsc, ['ts', 'typescript', 'tsc']);
export const RSCommand      = buildCommand(rs, ['rs', 'rust', 'rustc']);
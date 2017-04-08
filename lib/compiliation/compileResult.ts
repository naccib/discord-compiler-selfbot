import { Compiler } from './compiler';

/**
 * Represents the result of a compiliation.
 */
export class CompileResult
{
    public Code : string;

    /**
     * The compiliation output (if any).
     */
    public Output? : string;

    /**
     * The compiliation error (if any).
     */
    public Error?  : string;
    public ExtraOptions? : any;

    public isError? : boolean;

    public Compiler : Compiler;

    /**
     * The time it took to compile.
     */
    public CompileTime? : [number, number];
}
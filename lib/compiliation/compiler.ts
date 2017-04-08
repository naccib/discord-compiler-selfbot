import { CompileResult } from "./compileResult";

/**
 * The base class for a compiler.
 */
export abstract class Compiler
{
    /**
     * The name of the language this compiler will compile. 
     */
    public LanguageName : string;

    /**
     * The markdown highlight string to use on code blocks.
     */
    public MarkdownHighlight : string;

    /**
     * The function that is being called when compiling.
     */
    public CompileFunction : (compiler : Compiler, code : string) => CompileResult;

    /**
     * The preprocess function.
     */
    public PreprocessFunction : (code : string) => string;

    /**
     * Creates a new Compiler.
     * @param langName The name of the language this compiler will compile.
     * @param markdownHighlight The markdown highlight string to use on code blocks.
     */
    constructor(langName : string, markdownHighlight : string)
    {
        this.LanguageName = langName;
        this.MarkdownHighlight = markdownHighlight;
    }

    /**
     * Compiles a piece of code.
     */
    public compile(code : string) : CompileResult
    {
        if(!this.CompileFunction)
            return {
                Error: "This compiler is *not* implemented yet.",
                CompileTime: [0, 0],
                Code: code,
                Compiler: this
            };

        if(this.PreprocessFunction)
            code = this.PreprocessFunction(code);

        let initialTime = process.hrtime();

        //@todo: Measure this time.
        let compiliationResult = this.CompileFunction(this, code);
        compiliationResult.CompileTime = process.hrtime(initialTime);

        return compiliationResult;
    }
}
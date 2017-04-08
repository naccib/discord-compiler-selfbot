# Discord Compiler Selfbot
This is a [Discord](https://discordapp.com/) selfbot that allows you to compile and run code from Discord.

### Installing and Running
You first need to clone this repo and install all dependencies.

```
git clone https://github.com/naccib/discord-compiler-selfbot.git

npm install
npm install -g grunt
```

And, if you want to have a TypeScript compiler command: 
```
npm install -g typescript
npm install -g ts-node
```

Then you need to create a `token.ts` file at `/lib`, in the following format:
```ts
// lib/token.ts
export const Token = "your-token";
```
*Go to the FAQ if you do not know how to get your token.*

Now just build and run it with 
```
npm run test
```

### Using
Once you've connected to Discord, you can use `&[language] [code]` or `![language] [code]` to run commands.

#### Command List:
 * Rust
 * C++17
 * Python 2
 * Python 3
 * Ruby
 * TypeScript

Note: You *must* have the compilers for the following languages on your PATH to use the commands. (`g++`, `rustc`, `python`, `python3`, `ruby`, `ts-node`).
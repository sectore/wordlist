# [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md) | [SLIP-39](https://github.com/satoshilabs/slips/blob/master/slip-0039.md) word list

Explore [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md) and [SLIP-39](https://github.com/satoshilabs/slips/blob/master/slip-0039.md) word list in up to 10 languages. Filter words or search for word positions.

## Live

https://sectore.github.io/wordlist

## Preview

https://github.com/user-attachments/assets/0678c720-3c63-401a-be1f-16a1929d9e11

## Develop (locally)

Once you've installed dependencies with `bun i`, start a development server:

```bash
bun i # only once
bun dev --open
```

## Build (production)

```bash
bun run build
bun run preview --open
```

## Tests

```bash
bun run test
```

## Import wordlists

Word lists have been imported from original sources of [`BIP-39`](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md) and [`SLIP-39`](https://github.com/satoshilabs/slips/blob/master/slip-0039.md) located at GitHub.

Run following script to re-import those word lists.

```bash
bun run import:bip39
bun run import:slip39
```

## Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Svelte](https://svelte.dev/)
- [daisyUI](https://daisyui.com/)
- [Effect](https://effect.website/)
- [svelte-typewriter](https://github.com/satohshi/svelte-typewriter)
- [lucide-svelte](https://lucide.dev/)

## License

[MIT](./LICENSE)

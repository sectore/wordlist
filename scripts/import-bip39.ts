import { Effect, Layer, pipe, Array as A } from 'effect';
import { BunRuntime } from '@effect/platform-bun';
import * as NodeFileSystem from '@effect/platform-node-shared/NodeFileSystem';
import { Config, program } from './import-wordlist';
import { GITHUB_URLS, RAW_GITHUB_URLS } from '../src/lib/const';
import { languages } from '../src/lib/types';

const all = pipe(
	languages,
	A.map((lang) =>
		Layer.succeed(
			Config,
			Config.of({
				get: Effect.succeed({
					type: 'bip39',
					lang,
					github_raw: new URL(RAW_GITHUB_URLS.bip39[lang]),
					github_url: new URL(GITHUB_URLS.bip39[lang]),
					pathToSave: `./src/lib/wordlists/bip39-${lang}.ts`
				})
			})
		)
	),
	A.map((configL) => program.pipe(Effect.provide(Layer.merge(NodeFileSystem.layer, configL)))),
	Effect.all
);

all.pipe(BunRuntime.runMain);

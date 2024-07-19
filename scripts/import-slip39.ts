import { Effect, Layer } from 'effect';
import { BunRuntime } from '@effect/platform-bun';
import * as NodeFileSystem from '@effect/platform-node-shared/NodeFileSystem';
import { Config, program } from './import-wordlist';
import { GITHUB_URLS, RAW_GITHUB_URLS } from '../src/lib/const';

// EN available only
const lang = 'en';

const ConfigLayer = Layer.succeed(
	Config,
	Config.of({
		get: Effect.succeed({
			type: 'slip39',
			lang,
			github_raw: new URL(RAW_GITHUB_URLS.bip39[lang]),
			github_url: new URL(GITHUB_URLS.bip39[lang]),
			pathToSave: `./src/lib/wordlists/slip39-${lang}.ts`
		})
	})
);

program.pipe(Effect.provide(Layer.merge(NodeFileSystem.layer, ConfigLayer)), BunRuntime.runMain);

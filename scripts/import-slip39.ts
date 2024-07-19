import { Effect, Layer } from 'effect';
import { BunRuntime } from '@effect/platform-bun';
import * as NodeFileSystem from '@effect/platform-node-shared/NodeFileSystem';
import { Config, program } from './import-wordlist';
import { GITHUB_URLS, RAW_GITHUB_URLS } from '../src/lib/const';
import { WordListType } from '../src/lib/types';

const type: WordListType = 'slip39';
// EN available only
const lang = 'en';

const ConfigLayer = Layer.succeed(
	Config,
	Config.of({
		get: Effect.succeed({
			type,
			lang,
			github_raw: new URL(RAW_GITHUB_URLS[type][lang]),
			github_url: new URL(GITHUB_URLS[type][lang]),
			pathToSave: `./src/lib/wordlists/slip39-${lang}.ts`
		})
	})
);

program.pipe(Effect.provide(Layer.merge(NodeFileSystem.layer, ConfigLayer)), BunRuntime.runMain);

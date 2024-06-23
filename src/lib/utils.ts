import { Effect, pipe, flow } from 'effect';
import * as O from 'effect/Option';
import * as N from 'effect/Number';
import * as S from 'effect/String';
import * as A from 'effect/Array';
import * as SC from '@effect/schema/Schema';
import * as KeyValueStore from '@effect/platform/KeyValueStore';
import { BrowserKeyValueStore } from '@effect/platform-browser';
import type { WordList, WordListItem } from './types';

export const validPosition: (n: string) => O.Option<number> = flow(
	N.parse,
	O.filter(N.isNumber),
	O.filter((n) => n > 0 && n <= 2048)
);

export const validWord = (s: string, wordlist: WordList): O.Option<WordListItem> =>
	pipe(
		s,
		S.length,
		O.liftPredicate((n) => n > 0 && n <= 8),
		O.flatMap(() => A.findFirst(wordlist, ({ word }) => word.startsWith(s)))
	);

export const getLocalStorage = <A>(key: string, schema: SC.Schema<A, string, never>) => {
	const effect = pipe(
		KeyValueStore.KeyValueStore,
		Effect.flatMap((kv) => kv.get(key)),
		// In case there is no value, set empty string to break decoding in next step
		Effect.map(O.getOrElse(() => '')),
		Effect.flatMap(SC.decodeUnknown(schema))
	);
	return Effect.provide(effect, BrowserKeyValueStore.layerLocalStorage);
};

export const setLocalStorage = <A>(value: A, key: string, schema: SC.Schema<A, string, never>) => {
	const effect = pipe(
		value,
		SC.encode(schema),
		Effect.flatMap((encoded) =>
			pipe(
				KeyValueStore.KeyValueStore,
				Effect.flatMap((kv) => kv.set(key, encoded))
			)
		)
	);
	return Effect.provide(effect, BrowserKeyValueStore.layerLocalStorage);
};

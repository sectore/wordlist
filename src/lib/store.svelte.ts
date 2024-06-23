import { wordlists } from 'bip39';
import { pipe, Effect as E } from 'effect';
import * as O from 'effect/Option';
import { shuffle } from 'effect/Random';
import { fromIterable } from 'effect/Array';
import * as A from 'effect/Array';
import { validPosition } from '$lib/utils';

export enum PATHS {
	HOME = '/',
	LIST = '/list',
	GRID = '/grid'
}

export const lang = [
	'en',
	'fr',
	'cz',
	'it',
	'jp',
	'kr',
	'pt',
	'es',
	'zh-Hans' /* zh simplified */,
	'zh-Hant' /* zh traditional */
] as const;

export type LANG = (typeof lang)[number];

// bip30 wordlists
// https://github.com/bitcoinjs/bip39/tree/master/src/wordlists
const WORDLISTS: Record<LANG, string[]> = {
	en: wordlists['english'],
	cz: wordlists['czech'],
	'zh-Hans': wordlists['chinese_simplified'],
	'zh-Hant': wordlists['chinese_traditional'],
	fr: wordlists['french'],
	it: wordlists['italian'],
	jp: wordlists['japanese'],
	kr: wordlists['korean'],
	pt: wordlists['portuguese'],
	es: wordlists['spanish']
};

type WordListPos = {
	pos: number;
	word: string;
};

class Store {
	selectedLang = $state<LANG>('en');
	randomize = $state(false);
	wordlist = $derived(WORDLISTS[this.selectedLang]);
	#wordlistPositioned: WordListPos[] = $derived.by(() =>
		pipe(
			this.wordlist,
			A.map((word, i) => ({ pos: i + 1, word }))
		)
	);
	wordlistRandomizable = $derived.by(() =>
		this.randomize
			? pipe(this.#wordlistPositioned, shuffle, E.map(fromIterable), E.runSync)
			: this.#wordlistPositioned
	);
	filter = $state<O.Option<string>>(O.none());
	wordlistFiltered = $derived.by(() =>
		pipe(
			this.filter,
			O.match({
				// 1. no filter
				onNone: () => this.#wordlistPositioned,
				// 2. try to filter by position
				onSome: (filter) => {
					const oFilteredByPosition = pipe(
						validPosition(filter),
						O.flatMap((position) =>
							// Note: Position entered by users in search form starts with 1
							// That's `index = pos - 1`
							A.get(position - 1)(this.#wordlistPositioned)
						),
						O.map(A.make)
					);
					// 3. If a filter does not include a position (number),
					// try to filter words by a given string
					return pipe(
						oFilteredByPosition,
						O.getOrElse(() =>
							A.filter(this.#wordlistPositioned, ({ word }) => word.startsWith(filter))
						)
					);
				}
			})
		)
	);
}

export default new Store();

import { wordlists } from 'bip39';
import { pipe } from 'effect';
import * as O from 'effect/Option';
import * as A from 'effect/Array';
import { validPosition } from '$lib/utils';
import type { WordList } from './types';

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

class Store {
	selectedLang = $state<LANG>('en');
	randomize = $state(false);
	// @private
	#wordlist: WordList = $derived.by(() =>
		pipe(
			WORDLISTS[this.selectedLang],
			A.map((word, i) => ({ pos: i + 1, word }))
		)
	);
	// Make wordlist readable only
	wordlist = $derived(this.#wordlist);

	filter = $state<O.Option<string>>(O.none());
	wordlistFiltered = $derived.by(() =>
		pipe(
			this.filter,
			O.match({
				// 1. no filter
				onNone: () => this.#wordlist,
				// 2. try to filter by position
				onSome: (filter) => {
					const oFilteredByPosition = pipe(
						validPosition(filter),
						O.flatMap((position) =>
							// Note: Position entered by users in search form starts with 1
							// That's `index = pos - 1`
							A.get(position - 1)(this.#wordlist)
						),
						O.map(A.make)
					);
					// 3. If a filter does not include a position (number),
					// try to filter words by a given string
					return pipe(
						oFilteredByPosition,
						O.getOrElse(() => A.filter(this.#wordlist, ({ word }) => word.startsWith(filter)))
					);
				}
			})
		)
	);
}

export default new Store();

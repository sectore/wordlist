import { wordlists } from 'bip39';
import { pipe, Effect as E } from 'effect';
import * as O from 'effect/Option';
import { shuffle } from 'effect/Random';
import { fromIterable } from 'effect/Array';
import * as A from 'effect/Array';
import { validIndex } from '$lib/utils';

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
	wordlist = $derived(WORDLISTS[this.selectedLang]);
	wordlistRandomizable = $derived.by(() =>
		this.randomize ? pipe(this.wordlist, shuffle, E.map(fromIterable), E.runSync) : this.wordlist
	);
	filter = $state<O.Option<string>>(O.none());
	wordlistFiltered = $derived.by(() =>
		pipe(
			this.filter,
			O.match({
				// 1. no filter
				onNone: () => this.wordlist,
				onSome: (filter) => {
					// 2. filter by index
					const filteredByIndex = pipe(
						validIndex(filter),
						O.flatMap((f) => A.get(f)(this.wordlist)),
						O.map(A.make)
					);
					// 3. or filter by given string
					return pipe(
						filteredByIndex,
						O.getOrElse(() => A.filter(this.wordlist, (w) => w.startsWith(filter)))
					);
				}
			})
		)
	);
}

export default new Store();

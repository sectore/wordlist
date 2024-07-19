import { pipe } from 'effect';
import * as O from 'effect/Option';
import * as A from 'effect/Array';
import { validPosition } from '$lib/utils';
import type { LANG, WordList } from './types';
import bip39en from './wordlists/bip39-en';
import bip39cz from './wordlists/bip39-cz';
import bip39zhHans from './wordlists/bip39-zh-Hans';
import bip39zhHant from './wordlists/bip39-zh-Hant';
import bip39fr from './wordlists/bip39-fr';
import bip39it from './wordlists/bip39-it';
import bip39jp from './wordlists/bip39-jp';
import bip39kr from './wordlists/bip39-kr';
import bip39pt from './wordlists/bip39-pt';
import bip39es from './wordlists/bip39-es';

export enum PATHS {
	HOME = '/',
	LIST = '/list',
	GRID = '/grid'
}

// bip30 wordlists
// https://github.com/bitcoinjs/bip39/tree/master/src/wordlists
const WORDLISTS: Record<LANG, WordList> = {
	en: bip39en,
	cz: bip39cz,
	'zh-Hans': bip39zhHans,
	'zh-Hant': bip39zhHant,
	fr: bip39fr,
	it: bip39it,
	jp: bip39jp,
	kr: bip39kr,
	pt: bip39pt,
	es: bip39es
};

class Store {
	selectedLang = $state<LANG>('en');
	randomize = $state(false);
	// @private
	#wordlist: WordList = $derived.by(() => WORDLISTS[this.selectedLang]);
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

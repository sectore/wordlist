import { Effect, pipe } from 'effect';
import * as O from 'effect/Option';
import * as A from 'effect/Array';
import * as R from 'effect/Record';

import { getLocalStorage, setLocalStorage, validPosition } from '$lib/utils';
import { WordListTypeSchema, type LANG, type WordList, type WordListType } from './types';
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
import slip39es from './wordlists/slip39-en';

const WORD_LIST_MAP: Record<WordListType, Record<LANG, O.Option<string[]>>> = {
	// https://github.com/bitcoinjs/bip39/tree/master/src/wordlists
	bip39: {
		cz: O.some(bip39cz),
		en: O.some(bip39en),
		es: O.some(bip39es),
		fr: O.some(bip39fr),
		it: O.some(bip39it),
		jp: O.some(bip39jp),
		kr: O.some(bip39kr),
		pt: O.some(bip39pt),
		'zh-Hans': O.some(bip39zhHans),
		'zh-Hant': O.some(bip39zhHant)
	},
	slip39: {
		cz: O.none(),
		en: O.some(slip39es),
		es: O.none(),
		fr: O.none(),
		it: O.none(),
		jp: O.none(),
		kr: O.none(),
		pt: O.none(),
		'zh-Hans': O.none(),
		'zh-Hant': O.none()
	}
};

const KEY_WORD_LIST_TYPE = 'type';
const DEFAULT_WORD_LIST_TYPE: WordListType = 'bip39';

class Store {
	selectedLang = $state<LANG>('en');

	// @private
	#wordlistType = $state<WordListType>(DEFAULT_WORD_LIST_TYPE);

	constructor() {
		// check stored `WordlistType` at start
		this.checkWordlistType();
	}

	// getter
	wordlistType = $derived(this.#wordlistType);

	setWordlistType = (t: WordListType) =>
		pipe(
			setLocalStorage(t, KEY_WORD_LIST_TYPE, WordListTypeSchema),
			Effect.tap(() => (this.#wordlistType = t)),
			Effect.runSync
		);

	checkWordlistType = () =>
		pipe(
			getLocalStorage(KEY_WORD_LIST_TYPE, WordListTypeSchema),
			Effect.orElse(() => Effect.succeed(DEFAULT_WORD_LIST_TYPE)),
			Effect.tap((t) => (this.#wordlistType = t)),
			Effect.runSync
		);

	randomize = $state(false);
	// @private
	#wordlist: WordList = $derived.by(() =>
		pipe(
			WORD_LIST_MAP[this.#wordlistType][this.selectedLang],
			// transform `string` -> `WordListItem`
			O.map(A.map((word, i) => ({ pos: i + 1, word }))),
			O.getOrElse(() => [])
		)
	);
	// getter
	wordlist = $derived(this.#wordlist);

	languages = $derived.by(() =>
		pipe(
			WORD_LIST_MAP[this.#wordlistType],
			// filter out `none` values
			R.getSomes,
			// get languages (keys)
			R.keys
		)
	);

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

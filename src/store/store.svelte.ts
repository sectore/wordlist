import { wordlists } from 'bip39';
import { pipe, Effect as E } from 'effect';
import { shuffle } from 'effect/Random';
import { fromIterable } from 'effect/Array';

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
	selectedWordlist = $derived(WORDLISTS[this.selectedLang]);
	selectedWordlistRandomizeable = $derived.by(() =>
		this.randomize
			? pipe(this.selectedWordlist, shuffle, E.map(fromIterable), E.runSync)
			: this.selectedWordlist
	);
}

export default new Store();

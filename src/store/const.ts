import { wordlists } from 'bip39';

export const WORDLIST_URL = 'https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt';
export const WORDLIST_URL_RAW =
	'https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt';

export enum PATHS {
	HOME = '/',
	LIST = '/list',
	RANDOM = '/random'
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
export const WORDLISTS: Record<LANG, string[]> = {
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

export const getWordlist = () => WORDLISTS;

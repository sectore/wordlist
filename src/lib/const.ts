import type { LANG, WordListType } from './types';

const bip39Url = (file: string) => `https://github.com/bitcoin/bips/blob/master/bip-0039/${file}`;

type WordListUrls = Record<LANG, string>;

export const GITHUB_URLS: Record<WordListType, WordListUrls> = {
	bip39: {
		'zh-Hans': bip39Url('chinese_simplified.txt'),
		'zh-Hant': bip39Url('chinese_traditional.txt'),
		cz: bip39Url('czech.txt'),
		en: bip39Url('english.txt'),
		es: bip39Url('spanish.txt'),
		fr: bip39Url('french.txt'),
		it: bip39Url('italian.txt'),
		jp: bip39Url('japanese.txt'),
		kr: bip39Url('korean.txt'),
		pt: bip39Url('portuguese.txt')
	},
	slip39: {
		en: new URL('https://github.com/satoshilabs/slips/blob/master/slip-0039/wordlist.txt'),
		cz: '',
		es: '',
		fr: '',
		it: '',
		jp: '',
		kr: '',
		pt: '',
		'zh-Hans': '',
		'zh-Hant': ''
	}
};

const bip39RawUrl = (file: string) =>
	`https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/${file} `;

export const RAW_GITHUB_URLS: Record<WordListType, WordListUrls> = {
	bip39: {
		'zh-Hans': bip39RawUrl('chinese_simplified.txt'),
		'zh-Hant': bip39RawUrl('chinese_traditional.txt'),
		cz: bip39RawUrl('czech.txt'),
		en: bip39RawUrl('english.txt'),
		es: bip39RawUrl('spanish.txt'),
		fr: bip39RawUrl('french.txt'),
		it: bip39RawUrl('italian.txt'),
		jp: bip39RawUrl('japanese.txt'),
		kr: bip39RawUrl('korean.txt'),
		pt: bip39RawUrl('portuguese.txt')
	},
	slip39: {
		en: 'https://raw.githubusercontent.com/satoshilabs/slips/master/slip-0039/wordlist.txt',
		cz: '',
		es: '',
		fr: '',
		it: '',
		jp: '',
		kr: '',
		pt: '',
		'zh-Hans': '',
		'zh-Hant': ''
	}
};

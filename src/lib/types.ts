export const languages = [
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

export type LANG = (typeof languages)[number];

export type WordListType = 'bip39' | 'slip39';

export type WordListItem = {
	pos: number;
	word: string;
};

export type WordList = WordListItem[];

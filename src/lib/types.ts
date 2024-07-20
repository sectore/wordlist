import * as S from '@effect/schema/Schema';

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

export const WordListTypeSchema = S.parseJson(S.Literal('bip39', 'slip39'));

export type WordListType = typeof WordListTypeSchema.Type;
export type WordListTypencoded = typeof WordListTypeSchema.Encoded;

export type WordListItem = {
	pos: number;
	word: string;
};

export type WordList = WordListItem[];

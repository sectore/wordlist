import { describe, it, expect } from 'vitest';
import { validPosition, validWord } from './utils';
import * as O from 'effect/Option';

describe('utils', () => {
	describe('validPosition', () => {
		it('should return None for non-numeric string', () => {
			expect(validPosition('abc')).toEqual(O.none());
		});

		it('should return None for zero + negative numbers', () => {
			expect(validPosition('-1')).toEqual(O.none());
			expect(validPosition('0')).toEqual(O.none());
		});

		it('should return None for numbers > 2048', () => {
			expect(validPosition('2049')).toEqual(O.none());
		});

		it('should return Some for valid numbers within range', () => {
			expect(validPosition('2048')).toEqual(O.some(2048));
			expect(validPosition('1024')).toEqual(O.some(1024));
		});

		it('should return None for empty string', () => {
			expect(validPosition('')).toEqual(O.none());
		});
	});

	describe('validaWord', () => {
		const wordlist = [
			{ pos: 1, word: 'apple' },
			{ pos: 2, word: 'banana' },
			{ pos: 3, word: 'grape' },
			{ pos: 4, word: 'orange' },
			{ pos: 5, word: 'kiwi' }
		];

		it('should return none for an empty string', () => {
			expect(validWord('', wordlist)).toEqual(O.none());
		});

		it('should return none for a string longer than 8 characters', () => {
			expect(validWord('pineapple', wordlist)).toEqual(O.none());
		});

		it('should return none for a string not in the wordlist', () => {
			expect(validWord('pear', wordlist)).toEqual(O.none());
		});

		it('should return some for a valid word in the wordlist', () => {
			expect(validWord('apple', wordlist)).toEqual(O.some({ pos: 1, word: 'apple' }));
		});

		it('should return none for a valid length word not in the wordlist', () => {
			expect(validWord('peach', wordlist)).toEqual(O.none());
		});

		it('should return some for a word exactly 8 characters long if in wordlist', () => {
			const extendedWordlist = [...wordlist, { pos: 100, word: 'blueblue' }];
			expect(validWord('blueblue', extendedWordlist)).toEqual(
				O.some({ pos: 100, word: 'blueblue' })
			);
		});

		it('should return none for a word > 8 characters long ', () => {
			expect(validWord('blueberry', wordlist)).toEqual(O.none());
		});
	});
});

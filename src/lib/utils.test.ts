import { describe, it, expect } from 'vitest';
import { validIndex, validWord } from './utils';
import * as O from 'effect/Option';

describe('utils', () => {
	describe('validIndex', () => {
		it('should return None for non-numeric string', () => {
			expect(validIndex('abc')).toEqual(O.none());
		});

		it('should return None for negative numbers', () => {
			expect(validIndex('-1')).toEqual(O.none());
		});

		it('should return None for numbers greater than 2048', () => {
			expect(validIndex('2049')).toEqual(O.none());
		});

		it('should return Some for valid numbers within range', () => {
			expect(validIndex('0')).toEqual(O.some(0));
			expect(validIndex('2048')).toEqual(O.some(2048));
			expect(validIndex('1024')).toEqual(O.some(1024));
		});

		it('should return None for empty string', () => {
			expect(validIndex('')).toEqual(O.none());
		});
	});

	describe('validaWord', () => {
		const wordlist = ['apple', 'banana', 'grape', 'orange', 'kiwi'];

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
			expect(validWord('apple', wordlist)).toEqual(O.some('apple'));
		});

		it('should return none for a valid length word not in the wordlist', () => {
			expect(validWord('peach', wordlist)).toEqual(O.none());
		});

		it('should return some for a word exactly 8 characters long if in wordlist', () => {
			const extendedWordlist = [...wordlist, 'blueblue'];
			expect(validWord('blueblue', extendedWordlist)).toEqual(O.some('blueblue'));
		});

		it('should return none for a word > 8 characters long ', () => {
			expect(validWord('blueberry', wordlist)).toEqual(O.none());
		});
	});
});

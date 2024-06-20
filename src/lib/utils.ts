import { flow, pipe } from 'effect';
import * as O from 'effect/Option';
import * as N from 'effect/Number';
import * as S from 'effect/String';
import * as A from 'effect/Array';

export const validIndex: (n: string) => O.Option<number> = flow(
	N.parse,
	O.filter(N.isNumber),
	O.filter((n) => n >= 0 && n <= 2048)
);

export const validWord = (s: string, wordlist: string[]): O.Option<string> =>
	pipe(
		s,
		S.length,
		O.liftPredicate((n) => n > 0 && n <= 8),
		O.flatMap(() => A.findFirst<string>(wordlist, (w) => w.startsWith(s)))
	);

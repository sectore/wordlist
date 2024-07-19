import { Effect as E, pipe, String as S, Array as A, Context } from 'effect';
import { FileSystem } from '@effect/platform';
import { HttpClientRequest, HttpClient, HttpClientResponse } from '@effect/platform';
import prettier from 'prettier';
import { LANG, WordListType } from '../src/lib/types';

export class Config extends Context.Tag('Config')<
	Config,
	{
		readonly get: E.Effect<{
			readonly type: WordListType;
			readonly lang: LANG;
			readonly github_url: URL;
			readonly github_raw: URL;
			readonly pathToSave: string;
		}>;
	}
>() {}

const fetchWordlist = (raw_url: URL) =>
	HttpClientRequest.get(raw_url).pipe(HttpClient.fetch, HttpClientResponse.text);

const parseWordlist = ({
	result,
	type,
	url,
	lang
}: {
	result: string;
	type: WordListType;
	url: URL;
	lang: LANG;
}): string =>
	pipe(
		result,
		S.split(/\n/g),
		A.map(S.trim),
		A.filter(S.isNonEmpty),
		(wordlist) => `
  import { type WordList } from '../types'
  
  /**
   * Generated ${type} word list (${lang.toUpperCase()})
   * @source ${url.toString()}
   * 
   * Don't edit!
   */
  const wordlist:WordList = [${pipe(
		wordlist,
		A.map((s, i) => `{ pos: ${i + 1}, word: '${s}' }`),
		A.join(',')
	)}]

  export default wordlist
  `
	);

const formatWordlist = (wordlist: string, path: string) =>
	E.gen(function* (_) {
		yield* _(E.logInfo('Formatting ...'));
		const formatted = yield* _(
			E.promise(() =>
				prettier.format(wordlist, {
					filepath: path,
					parser: 'typescript',
					singleQuote: true,
					trailingComma: 'none'
				})
			)
		);
		return formatted;
	});

const writeWordlist = (wordlist: string, path: string) =>
	E.gen(function* (_) {
		yield* _(E.log(`Writing to ${path}`));
		const fs = yield* _(FileSystem.FileSystem);
		yield* _(fs.writeFileString(path, wordlist));
	});

export const program = E.gen(function* (_) {
	const config = yield* _(Config);
	const { type, pathToSave, github_raw, github_url, lang } = yield* config.get;
	yield* _(E.log(`Fetching word list from ${github_raw.toString()}`));
	const result = yield* _(fetchWordlist(github_raw));
	const wordlist = parseWordlist({ result, type, url: github_url, lang });
	const formatted = yield* _(formatWordlist(wordlist, pathToSave));
	yield* _(writeWordlist(formatted, pathToSave));
	yield* _(E.log(`DONE!`));
});

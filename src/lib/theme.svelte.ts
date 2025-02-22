import * as S from 'effect/Schema';
import { pipe } from 'effect';
import * as Effect from 'effect/Effect';
import { getLocalStorage, setLocalStorage } from './utils';

const ThemeSchema = S.parseJson(S.Literal('dark', 'light'));

export type Theme = typeof ThemeSchema.Type;
export type ThemeEncoded = typeof ThemeSchema.Encoded;

const KEY_THEME = 'theme';

class Store {
	#theme = $state<Theme>('light');
	theme = $derived(this.#theme);

	constructor() {
		// check Theme at start
		this.checkTheme();
	}

	private updateDom = (t: Theme) =>
		Effect.try({
			try: () => {
				const htmlClass = document.querySelector('html')?.classList;
				if (t === 'dark') htmlClass?.add('dark');
				else htmlClass?.remove('dark');
			},
			catch: (e: unknown) => {
				console.error('updateDom ', e);
				new Error(`Could not update html to add/remove theme ${e}`);
			}
		});

	setTheme = (t: Theme) =>
		pipe(
			setLocalStorage(t, KEY_THEME, ThemeSchema),
			Effect.flatMap(() => this.updateDom(t)),
			Effect.tap(() => (this.#theme = t)),
			Effect.runSync
		);

	checkTheme = () =>
		pipe(
			getLocalStorage(KEY_THEME, ThemeSchema),
			Effect.orElse(() =>
				Effect.succeed<Theme>(
					window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
				)
			),
			Effect.tap((t) => (this.#theme = t)),
			Effect.flatMap(this.updateDom),
			Effect.runSync
		);
}

export default new Store();

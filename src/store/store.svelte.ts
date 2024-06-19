import { WORDLISTS, type LANG } from './const';

class Store {
	selectedLang = $state<LANG>('en');
	selectedWordlist = $derived(WORDLISTS[this.selectedLang]);
}

export default new Store();

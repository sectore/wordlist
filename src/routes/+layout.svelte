<script>
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="container mx-auto flex min-h-screen flex-col px-4 pt-4 text-gray-600">
	<Header />
	{@render children()}
	<Footer />
</div>

<style></style>

<script>
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
	import '../app.css';
</script>

<div class="container mx-auto flex min-h-screen flex-col pt-4 text-gray-600">
	<Header />
	<slot></slot>
	<Footer />
</div>

<style></style>

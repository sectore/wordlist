<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import { wordlist } from '../store/wordlist';

	let noVisible = $state(false);
	let no = $state(0);
</script>

<div class="container mx-auto flex h-screen flex-col items-center text-gray-600">
	<div class="navbar px-4">
		<div class="flex-1 items-baseline">
			<h1 class="pr-1 text-4xl text-gray-600">bip39</h1>
			<h3 class="text text-base text-gray-500">word list</h3>
		</div>
		<div class="flex-none gap-4">
			<div class="form-control">
				<input type="text" placeholder="Search" class="input input-bordered md:w-auto" />
			</div>
		</div>
	</div>
	<div class="flex h-full flex-col items-center justify-center">
		<h3
			class="text-6xl text-gray-500 transition-opacity duration-150"
			class:opacity-0={!noVisible}
			class:opacity-100={noVisible}
		>
			#{no}
		</h3>
		<div class="text-9xl">
			<TypeWriter
				texts={wordlist}
				blinksBetweenTexts={0}
				typeSpeed={30}
				deleteSpeed={20}
				onTextStart={(i: number) => 
      {
        console.log('onTextStart', i);
        noVisible = true
        no = i + 1;
      }}
				onTextEnd={(i: number) => 
      {
        console.log('onTextChange', i);
    }}
				onTextDeleted={(i: number) => 
      {
        console.log('--onTextDeleted', i);
        noVisible = false
      }}
			/>
		</div>
	</div>
</div>

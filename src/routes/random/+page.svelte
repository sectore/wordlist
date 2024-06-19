<script lang="ts">
	import { TypeWriter } from 'svelte-typewrite';
	import { wordlist } from '../../store/wordlist';

	let noVisible = $state(false);
	let no = $state(0);
</script>

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
			ontypestart={(i: number) => {
        noVisible = true
        no = i + 1;
      }}
			ondeleteend={(i: number) => {
        noVisible = false
      }}
		/>
	</div>
  <div class="form-control pt-8">
    <label class="cursor-pointer label">
      <input type="checkbox" checked={false} class="checkbox checkbox-sm " /> 
      <span class="label-text ml-2 text-gray-400 uppercase">Randomize</span>
    </label>
  </div>
</div>

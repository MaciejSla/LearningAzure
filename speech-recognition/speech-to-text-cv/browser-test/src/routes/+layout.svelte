<script>
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<nav class="flex justify-center gap-5 mt-5">
    <a href="/search" class="btn variant-filled-primary">Search</a>
    <a href="/create" class="btn variant-filled-primary">Create</a>
</nav>

<slot />

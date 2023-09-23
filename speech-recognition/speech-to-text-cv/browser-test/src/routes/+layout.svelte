<script>
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import {AppBar, LightSwitch, initializeStores} from '@skeletonlabs/skeleton';
	initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppBar gridColumns='grid-cols-3' slotDefault='place-self-center gap-5' slotTrail='place-content-end'>
	<svelte:fragment slot="lead">
		<section>
			<h2 class="h2">
				<a href="/">Learning Azure</a>
			</h2>
		</section>
	</svelte:fragment>
	<div class="flex justify-center gap-5">
		<a href="/search" class="btn variant-filled-primary">Search</a>
		<a href="/create" class="btn variant-filled-primary">Create</a>
	</div>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

<slot />

<script>
    import {componentDidMount, fromMic, writableStore} from '$lib/recognizeOnceAsync'
	import { onMount } from 'svelte';
	onMount(componentDidMount);
    let text;
    writableStore.subscribe((value) => {
        text = value;
    })
</script>

<p>{text}</p>
<button on:click={fromMic}>Test</button>
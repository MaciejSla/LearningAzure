<script>
    import {fromMic} from '$lib/recognizeOnceAsync'
    import {componentDidMount} from '$lib/componentDidMount'
    import {writableStore} from '$lib/store'
	import { onMount } from 'svelte';
	onMount(componentDidMount);
    let text;
    writableStore.subscribe((value) => {
        text = value;
    })
</script>

<p>{text}</p>
<button on:click={fromMic}>Test</button>
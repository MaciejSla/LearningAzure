<script>
    import {fromMicOnce} from '$lib/recognizeOnceAsync'
    import {componentDidMount} from '$lib/componentDidMount'
    import {writableStore} from '$lib/store'
	import { onMount } from 'svelte';
	onMount(componentDidMount);
    let text;
    writableStore.subscribe((value) => {
        text = value;
    })
    function startRecognition() {
        text = "wait..."
        fromMicOnce()
    }
</script>

<p>{text}</p>
<input type="text" bind:value={text}>
<button on:click={startRecognition}>Test</button>
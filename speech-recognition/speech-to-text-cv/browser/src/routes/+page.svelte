<script>
    import {fromMicOnce} from '$lib/recognizeOnceAsync'
    import {componentDidMount} from '$lib/componentDidMount'
    import {writableStore} from '$lib/store'
	import { onMount } from 'svelte';
    import axios from 'axios';
	onMount(componentDidMount);
    let text;
    let name = '';
    writableStore.subscribe((value) => {
        text = value;
    })
    function startRecognition() {
        text = "wait..."
        fromMicOnce()
    }
    async function askGPT() {
        axios.post('/api/get-completion', {text}).then(res => {
            name = JSON.stringify(res.data)
        }).catch(err => {
            name = err.response.data
        })
    }
</script>

<p>{text}</p>
<input type="text" bind:value={text}>
<button on:click={startRecognition}>Test</button>
<button on:click={askGPT}>Send</button>
<p>{name}</p>
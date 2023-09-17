<script>
    import {fromMicOnce} from '$lib/recognizeOnceAsync'
    import {componentDidMount} from '$lib/componentDidMount'
    import {messageStore, resultStore} from '$lib/store'
	import { onMount } from 'svelte';
    import axios from 'axios';
	onMount(componentDidMount);
    let text;
    let name;
    messageStore.subscribe((value) => {
        name = value;
    })
    resultStore.subscribe((value) => {
        text = value;
        if (value != '') {
            askGPT()
        }
    })
    async function startRecognition() {
        text = "speak into your microphone..."
        fromMicOnce()
    }
    async function askGPT() {
        name = "loading..."
        axios.post('/api/get-completion', {text}).then(res => {
            axios.post('/api/db/getUser', res.data).then(res2 => {
                name = JSON.stringify(res2.data)
            }).catch(err => {
                name = err.response.data
            })
        }).catch(err => {
            name = err.response.data
        })
    }
</script>

<p>Komenda: {text}</p>
<input type="text" bind:value={text}>
<button on:click={startRecognition}>Test</button>
<button on:click={askGPT}>Send</button>
<p>{name}</p>
<script>
    import {fromMicOnce} from '$lib/recognizeOnceAsync'
    import {componentDidMount} from '$lib/componentDidMount'
	import { onMount } from 'svelte';
    import axios from 'axios';
	import { writable } from 'svelte/store';
	onMount(() => {
        componentDidMount(message)
    });
    let text = '';
    const message = writable('')
    const result = writable('')
    result.subscribe((value) => {
        text = value;
        if (value != '') {
            askGPT()
        }
    })
    async function startRecognition() {
        text = "speak into your microphone..."
        await fromMicOnce(message, result)
    }
    async function askGPT() {
        $message = "loading..."
        axios.post('/api/get-completion', {text: $result}).then(res => {
            axios.post('/api/db/getUser', res.data).then(res2 => {
                $message = JSON.stringify(res2.data)
            }).catch(err => {
                $message = err.response.data
            })
        }).catch(err => {
            $message = err.response.data
        })
    }

</script>

<p>Komenda: {text}</p>
<input type="text" bind:value={text} style="display: flex; width: auto;">
<button on:click={startRecognition}>Voice</button>
<button on:click={askGPT}>Send</button>
<p>{$message}</p>
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
        text = "listening..."
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

<div class="flex flex-col items-center mt-10">
    <div>
        <p>Command</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <button class="variant-filled-tertiary" on:click={startRecognition}>Voice</button>
            <input type="search" placeholder="Input command..." bind:value={text} size={text.length > 20 ? text.length : 20}/>
            <button class="variant-filled-secondary" on:click={askGPT}>Send</button>
        </div>
    </div>
    <!-- <label class="label mb-5">
        <span>Command</span>
        <input type="search" bind:value={text} title="Command" class="input" size={text.length > 20 ? text.length : 20}>
    </label>
    <div class="flex gap-5">
        <button on:click={startRecognition} class="btn variant-filled-tertiary">Voice</button>
        <button on:click={askGPT} class="btn variant-filled-tertiary">Send</button>
    </div> -->
    <p class="flex justify-center">{$message}</p>
</div>
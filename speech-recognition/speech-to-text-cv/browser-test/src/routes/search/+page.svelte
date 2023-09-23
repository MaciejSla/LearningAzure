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
    let userArr = [];
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
        axios.post('/api/get-completion', {text}).then(res => {
            axios.post('/api/db/getUser', res.data).then(res2 => {
                userArr = res2.data
                $message = ''
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
    <p class="flex justify-center">{$message}</p>
    <section class="p-4 space-y-4">
        {#each userArr as user, i }
            <pre class="variant-glass-surface p-4 rounded-xl ">{JSON.stringify(user, null, 2)}</pre>
        {/each}
    </section>
</div>
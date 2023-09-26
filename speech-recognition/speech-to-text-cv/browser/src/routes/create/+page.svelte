<script>
	import { schema } from '$lib/schema.js';
    import { superForm } from 'sveltekit-superforms/client'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
    import { fromMicOnce } from '$lib/recognizeOnceAsync.js';
	import { writable } from 'svelte/store';
    import axios from 'axios';
    import { InputChip, getToastStore, Toast, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onDestroy } from 'svelte';

    const toastStore = getToastStore();
    export let data;
    let isLoading = false
    let isListening = false
    let text = '';
    const voiceMessage = writable('')
    const result = writable('')

    const resultUnsubscribe = result.subscribe(value => {
        text = value;
        if (value != '') {
            askGPT()
            isListening = false
        }
    })

    const voiceMessageUnsubscribe = voiceMessage.subscribe(val => {
        isListening = false
        if (val?.background) {
            toastStore.trigger({
                message: val.text,
                background: val.background,
            })
        }
    })

    const { form, enhance, errors, message } = superForm(data.form, {
        dataType: 'json',
        validators: schema,
    })

    const messageUnsubscribe = message.subscribe(val => {
        if (val?.background) {
            toastStore.trigger({
                message: val.text,
                background: val.background,
            })
        }
    })

    async function startRecognition() {
        text = ''
        isListening = true
        fromMicOnce(voiceMessage, result)
    }

    async function askGPT() {
        isLoading = true
        await axios.post('/api/get-completion', {text}).then(res => {
            const values = res.data
            if (values.known_languages) {
                values.known_languages = {
                    create: values.known_languages
                }
            }
            if (values.interests) {
                values.interests = {
                    create: values.interests
                }
            }
            $form = {...$form, ...values}
            $voiceMessage = {text: 'Filled form', background: 'variant-filled-success'}
        }).catch(err => {
            $voiceMessage = {text: err.response.data, background: 'variant-filled-error'}
        })
        isLoading = false
    }

    onDestroy(() => {
        messageUnsubscribe();
        resultUnsubscribe();
        voiceMessageUnsubscribe();
    })
</script>

<style>
    small {
        color: red;
    }
</style>

<Toast />

<div class="flex flex-col items-center mt-10">
    <div>
        <p>Command</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <button class="variant-filled-tertiary" on:click={startRecognition}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 384 512">
                    <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/>
                </svg>
            </button>
            <input type="search" placeholder={isListening ? "listening..." : "Input command..."} bind:value={text} size={text.length > 20 ? text.length : 20}/>
            <button class={text.length == 0 ? 'variant-ghost-secondary' : 'variant-filled-secondary'} on:click={askGPT} disabled={text.length == 0}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="m-8">
        {#if isLoading}
            <ProgressRadial width="w-8" stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30"/>
        {/if}
    </div>
    
<form method="POST" use:enhance class="flex flex-col items-center gap-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">

        <div class="flex flex-col items-center">
            <label for="name" class="label w-full">
                <span>Name</span>
                <input type="text" name="name" bind:value={$form.name} placeholder='Name' class={'input ' + ($errors.name ? ' input-error' : null)}>
            </label>
            {#if $errors.name}
            <small>{$errors.name[0]}</small>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            <label for="surname" class="label w-full">
                <span>Surname</span>
                <input type="text" name="surname" bind:value={$form.surname} placeholder="Surname" class={'input ' + ($errors.surname ? ' input-error' : null)}>
            </label>
            {#if $errors.surname}
            <small>{$errors.surname[0]}</small>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            <label for="age" class="label w-full">
                <span>Age</span>
                <input type="text" name="age" bind:value={$form.age} placeholder="Age" class={'input ' + ($errors.age ? ' input-error' : null)}>
            </label>
            {#if $errors.age}
            <small>{$errors.age[0]}</small>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            <label for="name" class="label w-full">
                <span>Email</span>
                <input type="text" name="mail" bind:value={$form.mail} placeholder="mail@example.com" class={'input ' + ($errors.mail ? ' input-error' : null)}>
            </label>
            {#if $errors.mail}
            <small>{$errors.mail[0]}</small>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            <label for="name" class="label w-full">
                <span>Phone number</span>
                <input type="tel" name="phone" bind:value={$form.phone} placeholder="ex. 123456789" class={'input ' + ($errors.phone ? ' input-error' : null)}>
            </label>
            {#if $errors.phone}
            <small>{$errors.phone[0]}</small>
            {/if}
        </div>

        <div class="flex flex-col items-center">
            <label for="name" class="label w-full">
                <span>Job</span>
                <input type="text" name="job" bind:value={$form.job} placeholder="Enter job here..." class="input">
            </label>
        </div>

        <div class="flex flex-col items-center">
            <label for="name" class="label w-full">
                <span>Education</span>
                <input type="text" name="education" bind:value={$form.education} placeholder="Enter job here..." class="input">
            </label>
        </div>
        
        <label for="known_languages" class="label w-full">
            <span>Languages</span>
            <InputChip bind:value={$form.known_languages.create} name="known_languages"/>
        </label>
        <label for="interests" class="label">
            <span>Interests</span>
            <InputChip bind:value={$form.interests.create} name="interests"/>
        </label>
    </div>

    <button type="submit" class="btn variant-ghost-tertiary w-fit">Submit</button>
</form>
</div>
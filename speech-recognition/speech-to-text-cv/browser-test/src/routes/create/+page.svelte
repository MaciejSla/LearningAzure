<script>
	import { schema } from '$lib/schema.js';
    import { superForm } from 'sveltekit-superforms/client'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
    import { fromMicOnce } from '$lib/recognizeOnceAsync.js';
	import { writable } from 'svelte/store';
    import axios from 'axios';
    import { InputChip, getToastStore, Toast } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();
    export let data;
    let text = '';
    const voiceMessage = writable('')
    const result = writable('')

    result.subscribe(value => {
        text = value;
        if (value != '') {
            askGPT()
        }
    })

    voiceMessage.subscribe(val => {
        if (val?.type) {
            toastStore.trigger({
                message: val.text,
                background: `variant-filled-${val.type}`,
            })
        }
    })

    const { form, enhance, errors, message } = superForm(data.form, {
        dataType: 'json',
        validators: schema,
    })

    message.subscribe(val => {
        if (val?.type) {
            toastStore.trigger({
                message: val.text,
                background: `variant-filled-${val.type}`,
            })
        }
    })

    async function startRecognition() {
        text = "listening..."
        fromMicOnce(voiceMessage, result)
    }

    async function askGPT() {
        // $voiceMessage = "loading..."
        axios.post('/api/get-completion', {text}).then(res => {
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
            $voiceMessage = {text: 'Filled form', type: 'success'}
        }).catch(err => {
            $voiceMessage = {text: err.response.data, type: 'error'}
        })
    }
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
            <button class="variant-filled-tertiary" on:click={startRecognition}>Voice</button>
            <input type="search" placeholder="Input command..." bind:value={text} size={text.length > 20 ? text.length : 20}/>
            <button class="variant-filled-secondary" on:click={askGPT}>Send</button>
        </div>
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
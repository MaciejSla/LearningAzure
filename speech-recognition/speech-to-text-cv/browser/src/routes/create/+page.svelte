<script>
	import { schema } from '$lib/schema.js';
    import { superForm } from 'sveltekit-superforms/client'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

    export let data;

    const { form, enhance, errors, message } = superForm(data.form, {
        dataType: 'json',
        validators: schema,
    })

    function addField(field) {
        field.push({name: ''})
        $form = $form
    }
    function removeField(field) {
        field.pop()
        $form = $form
    }
</script>

<style>
    small {
        color: red;
    }
</style>

<SuperDebug data={$form} />

<br>

<form method="POST" use:enhance>
    <div>
        <label for="name">Name</label>
        <input type="text" name="name" bind:value={$form.name} placeholder="Name">
        {#if $errors.name}
        <br>
        <small>{$errors.name[0]}</small>
        {/if}
    </div>
    <div>
        <label for="name">Surname</label>
        <input type="text" name="surname" bind:value={$form.surname} placeholder="Surname">
        {#if $errors.surname}
        <br>
        <small>{$errors.surname[0]}</small>
        {/if}
    </div>

    <div>
        <label for="name">Age</label>
        <input type="text" name="age" bind:value={$form.age} placeholder="Age" >
        {#if $errors.age}
        <br>
        <small>{$errors.age[0]}</small>
        {/if}
    </div>

    <div>
        <label for="name">Email</label>
        <input type="text" name="mail" bind:value={$form.mail} placeholder="Email goes here..." >
        {#if $errors.mail}
        <br>
        <small>{$errors.mail[0]}</small>
        {/if}
    </div>

    <div>
        <label for="name">Phone number</label>
        <input type="tel" name="phone" bind:value={$form.phone} placeholder="ex. 123456789">
        {#if $errors.phone}
        <br>
        <small>{$errors.phone[0]}</small>
        {/if}
    </div>

    <div>
        <label for="name">Job</label>
        <input type="text" name="job" bind:value={$form.job} placeholder="Enter job here...">
    </div>

    <div>
        <label for="name">Education</label>
        <input type="text" name="education" bind:value={$form.education} placeholder="Enter job here...">
    </div>
    
    <div>
        Languages
        <button type="button" on:click={() => {addField($form.known_languages.create)}}>+</button>
        <button type="button" on:click={() => {removeField($form.known_languages.create)}}>-</button>
    </div>
    {#each $form.known_languages.create as _, i}
    <div>
        <input type="text" name="name" bind:value={$form.known_languages.create[i].name} placeholder="Enter language here...">
        {#if $errors.known_languages?.create[i].name}
        <br>
        <small>{$errors.known_languages?.create[i].name[0]}</small>
        {/if}
    </div>
    {/each}
    
    <div>
        Interests
        <button type="button" on:click={() => {addField($form.interests.create)}}>+</button>
        <button type="button" on:click={() => {removeField($form.interests.create)}}>-</button>
    </div>
    {#each $form.interests.create as _, i}
    <div>
        <input type="text" name="name" bind:value={$form.interests.create[i].name} placeholder="Enter interest here...">
        {#if $errors.interests?.create[i].name}
        <br>
        <small>{$errors.interests?.create[i].name[0]}</small>
        {/if}
    </div>
    {/each}

    <br>
    <input type="submit" value="Submit">
    {#if $message}
    {$message}  
    {/if}
</form>
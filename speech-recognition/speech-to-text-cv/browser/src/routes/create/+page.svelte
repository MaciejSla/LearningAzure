<script>
    import { superForm } from 'sveltekit-superforms/client'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

    export let data;

    const { form, enhance } = superForm(data.form, {
        dataType: 'json'
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

<SuperDebug data={$form} />

<br>

<form method="POST" use:enhance>
    <div>
        <label for="name">Name</label>
        <input type="text" name="name" bind:value={$form.name} placeholder="Name">
    </div>

    <div>
        <label for="name">Surname</label>
        <input type="text" name="surname" bind:value={$form.surname} placeholder="Surname">
    </div>

    <div>
        <label for="name">Age</label>
        <input type="text" name="age" bind:value={$form.age} >
    </div>

    <div>
        <label for="name">Email</label>
        <input type="email" name="mail" bind:value={$form.mail} placeholder="Email goes here..." >
    </div>

    <div>
        <label for="name">Phone number</label>
        <input type="tel" name="phone" bind:value={$form.phone} placeholder="123456789">
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
        <input type="text" name="name" bind:value={$form.known_languages.create[i].name}>
    </div>
    {/each}
    
    <div>
        Interests
        <button type="button" on:click={() => {addField($form.interests.create)}}>+</button>
        <button type="button" on:click={() => {removeField($form.interests.create)}}>-</button>
    </div>
    {#each $form.interests.create as _, i}
    <div>
        <input type="text" name="name" bind:value={$form.interests.create[i].name}>
    </div>
    {/each}

    <br>
    <input type="submit" value="Submit">
</form>
<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

    export let data;
    const { form, errors, enhance } = superForm(data.form, {
      dataType: 'json'
    });
    function addField() {
        $form.tags.push({id: 1, name: ''})
        $form = $form
    }
    function removeField() {
        $form.tags.pop()
        $form = $form
    }
  </script>

  <SuperDebug data={$form} />

  
  <form method="POST" use:enhance>
      <button type="button" on:click={addField}>+</button>
      <button type="button" on:click={removeField}>-</button>
    {#each $form.tags as _, i}
      <div>
        Id
        <input
          type="number"
          data-invalid={$errors.tags?.[i]?.id}
          bind:value={$form.tags[i].id} />
        Name
        <input
          data-invalid={$errors.tags?.[i]?.name}
          bind:value={$form.tags[i].name} />
        {#if $errors.tags?.[i]?.id}
          <br />
          <span class="invalid">{$errors.tags[i].id}</span>
        {/if}
        {#if $errors.tags?.[i]?.name}
          <br />
          <span class="invalid">{$errors.tags[i].name}</span>
        {/if}
      </div>
    {/each}
    <button>Submit</button>
  </form>
<script>
    // import axios from 'axios'
	import { onMount } from 'svelte';
    onMount(() => {
        fetch("/api/db")
    })
</script>
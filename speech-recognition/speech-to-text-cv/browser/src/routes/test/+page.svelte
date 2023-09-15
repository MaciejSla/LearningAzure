<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
    let result = '';
    onMount(async () => {
        let res = await axios.get("/api/db/getUser")
        result = res.data
    })
</script>

<p>{JSON.stringify(result)}</p>
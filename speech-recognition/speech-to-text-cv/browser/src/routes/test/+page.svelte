<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
    let result = 'loading...';
    onMount(async () => {
        await axios.post("/api/db/getUser", {name: "Mariusz"}).then(res => {
            result = JSON.stringify(res.data)
        }).catch(err => {
            result = err.response.data
        })
    })
</script>

<p>{result}</p>
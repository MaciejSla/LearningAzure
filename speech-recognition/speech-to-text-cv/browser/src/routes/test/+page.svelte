<script>
	import axios from 'axios';
    let result = 'Click the button';
    const data = {
				name: 'Stefan',
				surname: 'Woźniak',
				age: 73,
				mail: 'steve.wozniaka@gmail.com',
				phone: '123456789',
				job: 'wynalazca',
				education: 'UC Berkely College of Engineering',
				known_languages: {
					create: []
				}
			}
    async function sendRequest() {
        result = '...loading'
        await axios.post("/api/db/addUser", data).then(res => {
            result = JSON.stringify(res.data)
        }).catch(err => {
            result = err.response.data
        })
    }
</script>

<p>{result}</p>
<button on:click={sendRequest}>Test</button>
<script>
	export let data;
	import { onMount } from 'svelte';
	let media = [];
	let mediaRecorder = null;
	let recording = false;
	let audioSrc = null;
	let fileInput;
	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = function () {
			const blob = new Blob(media, { type: 'audio/wav' });
			media = [];
			const audio = document.querySelector('audio');
			audio.src = window.URL.createObjectURL(blob);
			audioSrc = window.URL.createObjectURL(blob);
			let file = new File([blob], 'recording.wav', {type: 'audio/wav'})
			let container = new DataTransfer();
			container.items.add(file)
			const newFileList = container.files;
			fileInput.files = newFileList;
		};
	});
	function toggleRecord() {
		if (recording) {
			mediaRecorder.stop();
			recording = false;
		} else {
			mediaRecorder.start();
			recording = true;
		}
	}
</script>

<h1>Audio based search</h1>

<section>
	<audio controls />
	<button on:click={toggleRecord}>Toggle</button>
</section>
<form method="POST" enctype="multipart/form-data">
  <input type="file" name="recording" bind:this={fileInput} style="display: none"/>
  <button type="submit" disabled={!audioSrc}>Submit</button>
</form>

<p>{data.text}</p>

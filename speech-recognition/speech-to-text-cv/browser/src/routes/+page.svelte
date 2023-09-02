<script>
	// export let data;
	import { onMount } from 'svelte';
	let media = [];
	let mediaRecorder = null;
	let recording = false;
	// let audioSrc = null;
	// let fileInput;
	onMount(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (e) => media.push(e.data);
		mediaRecorder.onstop = function () {
			const blob = new Blob(media, { type: 'audio/wav; codecs=opus' });
			media = [];
			const audio = document.querySelector('audio');
			audio.src = window.URL.createObjectURL(blob);
			// audioSrc = window.URL.createObjectURL(blob);
			// let file = new File([blob], 'recording.wav', {type: 'audio/wav', lastModified: new Date().getTime()})
			// let container = new DataTransfer();
			// container.items.add(file)
			// const newFileList = container.files;
			// fileInput.files = newFileList;
		};
	});
	function startRecording() {
		mediaRecorder.start();
		recording = true;
	}
	function stopRecording() {
		mediaRecorder.stop();
		recording = false;
	}
</script>

<h1>Audio based search</h1>

<section>
	<audio controls />
	<button on:click={startRecording} disabled={recording}>Record</button>
	<button on:click={stopRecording} disabled={!recording}>Stop</button>
</section>
<!-- TODO Send file to server -->
<!-- <form method="POST">
  <input type="file" name="file" bind:this={fileInput} style="display: none;"/>
  <button type="submit" disabled={!audioSrc}>Submit</button>
</form> -->

<p>{media}</p>

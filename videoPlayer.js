document.getElementById('playButton').addEventListener('click', function() {
	var video = document.getElementById('myVideo');
	video.play();
	this.parentElement.classList.add('playing');
});

document.getElementById('myVideo').addEventListener('click', function() {
	if (!this.paused) {
		this.pause();
		this.parentElement.classList.remove('playing');
	}
});

document.getElementById('myVideo').addEventListener('ended', function() {
	this.parentElement.classList.remove('playing');
});
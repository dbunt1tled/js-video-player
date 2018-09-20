class VideoPlayer {
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = this.player.querySelector('.progress');
        this.progressBar = this.player.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player_slider');
    }
    init() {
        this.events();
    }
    events() {
        this.video.addEventListener('click', e => this.handleTogglePlay());
        this.toggle.addEventListener('click', e => this.handleTogglePlay());
        this.ranges.forEach( range => {
            range.addEventListener('change', e => this.handleRangeUpdate(e));
            range.addEventListener('mousemove', e => this.handleRangeUpdate(e));
        });
        this.skipButtons.forEach( button => {
            button.addEventListener('click', e => this.handleSkip(e));
        });
    }
    handleTogglePlay() {
        const method = this.video.paused ? 'play' : 'pause';
        this.video[method]();
        this.toggle.querySelector('.fas').classList.toggle('fa-pause');
        this.toggle.querySelector('.fas').classList.toggle('fa-play');
    }
    handleRangeUpdate(event) {
        this.video[event.target.name] = event.target.value;
    }
    handleSkip(event) {
        this.video.currentTime += parseInt(event.target.dataset.skip);
    }
}
const myPlayer = new VideoPlayer();
myPlayer.init();
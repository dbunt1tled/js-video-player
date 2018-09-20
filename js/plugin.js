class VideoPlayer {
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = this.player.querySelector('.progress');
        this.progressBar = this.player.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player_slider');
        this.progresMouseDown = false;
    }
    init() {
        this.events();
    }
    events() {
        this.video.addEventListener('click', e => this.handleTogglePlay());
        this.video.addEventListener('timeupdate', e => this.handleProgress(e));
        this.toggle.addEventListener('click', e => this.handleTogglePlay());
        this.ranges.forEach( range => {
            range.addEventListener('change', e => this.handleRangeUpdate(e));
            range.addEventListener('mousemove', e => this.handleRangeUpdate(e));
        });
        this.skipButtons.forEach( button => {
            button.addEventListener('click', e => this.handleSkip(e));
        });
        this.progress.addEventListener('click', e => this.scrubHandle(e));
        this.progress.addEventListener('mousemove', e => this.progresMouseDown && this.scrubHandle(e));
        this.progress.addEventListener('mousedown', () => this.progresMouseDown = true);
        this.progress.addEventListener('mouseup', () => this.progresMouseDown = false);
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
    handleProgress(event) {
        const percent = (this.video.currentTime / this.video.duration).toFixed(2) * 100;
        this.progressBar.style.flexBasis = `${percent}%`;
    }
    scrubHandle(event) {
        this.video.currentTime =  (event.offsetX / this.progress.offsetWidth) * this.video.duration;
    }
}
const myPlayer = new VideoPlayer();
myPlayer.init();
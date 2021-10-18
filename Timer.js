export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();
        this.el = {
            minutes: root.querySelector('.timer__part--minutes'),
            seconds: root.querySelector('.timer__part--seconds'),
            control: root.querySelector('.timer__btn--control'),
            reset: root.querySelector('.timer__btn--reset'),
        }
        this.interval = null;
        this.remainingSeconds = 90;

        this.el.control.addEventListener('click', () => {
            //TODO
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        })
        this.el.reset.addEventListener('click', () => {
            //TODO
            const inputeMinute = prompt("Enter Number Of Minute : ");
            if (inputeMinute < 60) {
                this.stop();
                this.remainingSeconds = inputeMinute * 60;
                this.updateInterFaceTime();
            }
        })
    }
    updateInterFaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, '0');
        this.el.seconds.textContent = seconds.toString().padStart(2, '0');

    }
    updateInterFaceControl() {
        if (this.interval === null) {
            this.el.control.innerHTML = ` <span class="material-icons">
            play_arrow
        </span>`
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterFaceTime();

            if (this.remainingSeconds === null) {
                this.stop();
            }
        }, 1000);

        this.updateInterFaceControl();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterFaceControl();
    }

    static getHTML() {
        return ` <span class="timer__part timer__part--minutes">
        00
    </span>
    <span class="timer__part">
        :
    </span>
    <span class="timer__part timer__part--seconds">
        00
    </span>
    <button type="button" class="timer__btn timer__btn--control timer__btn--start">
        <span class="material-icons">
            play_arrow
        </span>
    </button>
    <button type="button" class="timer__btn timer__btn--control timer__btn--reset">
        <span class="material-icons">
            timer
        </span>
    </button>`
    }
}
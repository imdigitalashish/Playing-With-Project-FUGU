class Application {
    constructor() {


        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.coords = {
            x: 30,
            y: 30,
        }
        requestAnimationFrame(this.render.bind(this))
        const stream = this.canvas.captureStream(25);
        this.recordedChunks = [];
        const options = { mimeType: "video/webm; codecs=vp9" };
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.onstop = this.download;
        document.addEventListener("click", () => {
            if (this.mediaRecorder.state === "recording") {
                this.mediaRecorder.stop();
            }
            else {
                this.mediaRecorder.start();
            }
            console.log(this.mediaRecorder.state);
        })
    }

    handleDataAvailable = (event) => {
        console.log("STARTED")
        if (event.data.size > 0) {
            console.log(event)
            console.log(event.data);
            this.recordedChunks.push(event.data);
            // this.recordedChunks.push(event.data);
            // this.download();
        } else {
            // Handle empty data
            console.log("EMPTYU")
        }
    }

    download = () => {
        const blob = new Blob(this.recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    render(ts) {



        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);





        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.coords.x, this.coords.y, 40, 40);


        this.coords.x += 10;
        this.coords.y += 10;


        if (this.coords.x > this.canvas.width) {
            this.coords.x = 0;
        }

        if (this.coords.y > this.canvas.height) {
            this.coords.y = 0;
        }

        requestAnimationFrame(this.render.bind(this));
    }
}


window.onload = () => {
    window.app = new Application();
}
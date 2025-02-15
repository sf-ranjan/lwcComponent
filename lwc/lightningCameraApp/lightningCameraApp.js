import { LightningElement,track,api } from 'lwc';

export default class LightningCameraApp extends LightningElement {
    @track videoElement;
    @track canvasElement;
    @track isActive = false;
    @track capturedImage;
    @api camLabel = 'Start Camera';


    async renderedCallback() {
        this.videoElement = this.template.querySelector('.videoElement');
        this.canvasElement = this.template.querySelector('.canvasElement');
    }

    async initCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && !this.isActive) {
            try {
                this.videoElement.srcObject = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
                this.isActive = !this.isActive;
                this.camLabel = 'Stop Camera';
            } catch (error) {
                console.error(JSON.stringify(error));
            }
        } else {
            this.stopCamera();
        }
    }

    async stopCamera(){
        const video = this.template.querySelector(".videoElement");
        video.srcObject.getTracks().forEach((track) => track.stop());
        video.srcObject = null;
        this.isActive = !this.isActive;
        this.camLabel = 'Start Camera';
    }

    async captureImage() {
        if(this.videoElement && this.videoElement.srcObject !== null && this.isActive) {
            this.canvasElement.height = this.videoElement.videoHeight;
            this.canvasElement.width = this.videoElement.videoWidth;
            const context = this.canvasElement.getContext('2d');
            context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
            this.captureImage = this.canvasElement.toDataURL('image/png');
            const imageElement = this.template.querySelector('.imageElement');
            imageElement.setAttribute('src', this.captureImage);
            imageElement.classList.add('slds-show');
            imageElement.classList.remove('slds-hide');
            this.stopCamera();
        }
    }

    clearImage(){
        const imageElement = this.template.querySelector('.imageElement');
        imageElement.setAttribute('src', "");
        imageElement.classList.add('slds-hide');
        imageElement.classList.remove('slds-show');
    }
}
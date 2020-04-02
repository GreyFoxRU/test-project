
export class Common {

    isProcessing: boolean = false;
    loadingTimeout?: number;

    async setIsLoading(): Promise<void> {
        this.loadingTimeout = window.setTimeout(() => this.isProcessing = true, 200);
    }

}
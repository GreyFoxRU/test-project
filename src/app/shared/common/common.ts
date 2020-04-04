
/**
 * Класс общих свойств и функций компонентов.
 */
export class Common {

    isProcessing: boolean = false;
    protected loadingTimeout?: number;

    /**
     * Устанавливает свойство isProcessing в состояние true с задержкой 200 мс.
     */
    setIsLoading(): void {
        this.loadingTimeout = window.setTimeout(() => this.isProcessing = true, 200);
    }

}

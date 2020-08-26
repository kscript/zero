export interface Icons {
    validating: string;
    success: string;
    error: string;
}
export type ValidateState = 'validating' | 'success' | 'error'
export interface elFormInject {
    statusIcon: any;
    disabled: boolean;
}
export interface elFormItemInject {
    elFormItemSize: string;
    validateState: ValidateState;
}
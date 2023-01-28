export type AreaStatusType = {
    error: boolean;
    status: number;
    message: string;
    errorCode?: string;
};

export interface AreaAuthType extends AreaStatusType {
    token: string;
}

/**
 * @description Type needed for the about.json
 */
export interface AboutType {
    client: {
        host: string;
    };
    server: {
        current_time: number;
        services: {
            name: string;
            actions: {
                name: string;
                description: string;
            }[];
            reactions: {
                name: string;
                description: string;
            }[];
        }[];
    };
}

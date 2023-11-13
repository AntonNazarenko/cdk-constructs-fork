import { ITable } from '@aws-cdk/aws-dynamodb';
import { Construct, Duration } from '@aws-cdk/core';
import { Seeds } from './seeds';
export interface DynamoDBSeederProps {
    readonly table: ITable;
    readonly seeds: Seeds;
    /**
     * The function execution time (in seconds) after which Lambda terminates the function.
     *
     * Because the execution time affects cost, set this value
     * based on the function's expected execution time.
     *
     * @default Duration.minutes(15)
     */
    readonly timeout?: Duration;
}
export declare class DynamoDBSeeder extends Construct {
    constructor(scope: Construct, id: string, props: DynamoDBSeederProps);
}

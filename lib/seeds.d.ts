import { IBucket, Location } from '@aws-cdk/aws-s3';
import { AssetOptions } from '@aws-cdk/aws-s3-assets';
import { Construct } from '@aws-cdk/core';
export declare abstract class Seeds {
    /**
     * @param bucket The S3 bucket.
     * @param key The object key.
     * @param objectVersion Optional S3 object version.
     * @returns `S3Seeds` associated with the specified S3 object.
     */
    static fromBucket(bucket: IBucket, key: string, objectVersion?: string): S3Seeds;
    /**
     * @param seeds The actual json code (limited to 4KiB).
     * @returns `InlineSeeds` with inline seeds.
     */
    static fromInline(seeds: Record<string, unknown>[]): InlineSeeds;
    /**
     * Loads the seeds from a local disk path and uploads it to s3.
     *
     * @param path Path to json seeds file.
     * @returns `JsonFileSeeds` associated with the specified S3 object.
     */
    static fromJsonFile(path: string, options?: AssetOptions): JsonFileSeeds;
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     *
     * @param scope The binding scope.
     */
    abstract bind(scope: Construct): SeedsConfig;
}
export interface SeedsConfig {
    /**
     * The location of the seeds in S3.
     */
    readonly s3Location?: Location;
    /**
     * Inline seeds.
     */
    readonly inlineSeeds?: string;
}
/**
 * Seeds from an S3 archive.
 */
export declare class S3Seeds extends Seeds {
    private key;
    private objectVersion?;
    private bucketName;
    constructor(bucket: IBucket, key: string, objectVersion?: string | undefined);
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(_scope: Construct): SeedsConfig;
}
/**
 * Seeds from an inline json object (limited to 4KiB).
 */
export declare class InlineSeeds extends Seeds {
    private seeds;
    constructor(seeds: string);
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(_scope: Construct): SeedsConfig;
}
/**
 * Seeds from a local json file.
 */
export declare class JsonFileSeeds extends Seeds {
    readonly path: string;
    private readonly options;
    private asset?;
    constructor(path: string, options?: AssetOptions);
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(scope: Construct): SeedsConfig;
}

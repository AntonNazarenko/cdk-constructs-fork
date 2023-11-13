"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileSeeds = exports.InlineSeeds = exports.S3Seeds = exports.Seeds = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const fs = require("fs");
const aws_s3_assets_1 = require("@aws-cdk/aws-s3-assets");
class Seeds {
    /**
     * @param bucket The S3 bucket.
     * @param key The object key.
     * @param objectVersion Optional S3 object version.
     * @returns `S3Seeds` associated with the specified S3 object.
     */
    static fromBucket(bucket, key, objectVersion) {
        return new S3Seeds(bucket, key, objectVersion);
    }
    /**
     * @param seeds The actual json code (limited to 4KiB).
     * @returns `InlineSeeds` with inline seeds.
     */
    static fromInline(seeds) {
        return new InlineSeeds(JSON.stringify(seeds));
    }
    /**
     * Loads the seeds from a local disk path and uploads it to s3.
     *
     * @param path Path to json seeds file.
     * @returns `JsonFileSeeds` associated with the specified S3 object.
     */
    static fromJsonFile(path, options) {
        return new JsonFileSeeds(path, options);
    }
}
exports.Seeds = Seeds;
_a = JSII_RTTI_SYMBOL_1;
Seeds[_a] = { fqn: "@cloudcomponents/cdk-dynamodb-seeder.Seeds", version: "1.39.0" };
/**
 * Seeds from an S3 archive.
 */
class S3Seeds extends Seeds {
    constructor(bucket, key, objectVersion) {
        super();
        this.key = key;
        this.objectVersion = objectVersion;
        if (!bucket.bucketName) {
            throw new Error('BucketName is undefined for the provided bucket');
        }
        this.bucketName = bucket.bucketName;
    }
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(_scope) {
        return {
            s3Location: {
                bucketName: this.bucketName,
                objectKey: this.key,
                objectVersion: this.objectVersion,
            },
        };
    }
}
exports.S3Seeds = S3Seeds;
_b = JSII_RTTI_SYMBOL_1;
S3Seeds[_b] = { fqn: "@cloudcomponents/cdk-dynamodb-seeder.S3Seeds", version: "1.39.0" };
/**
 * Seeds from an inline json object (limited to 4KiB).
 */
class InlineSeeds extends Seeds {
    constructor(seeds) {
        super();
        this.seeds = seeds;
        if (seeds.length === 0) {
            throw new Error('Inline seeds cannot be empty');
        }
        if (seeds.length > 4096) {
            throw new Error(`Inline seeds are too large, must be <= 4096 but is ${seeds.length}`);
        }
    }
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(_scope) {
        return {
            inlineSeeds: this.seeds,
        };
    }
}
exports.InlineSeeds = InlineSeeds;
_c = JSII_RTTI_SYMBOL_1;
InlineSeeds[_c] = { fqn: "@cloudcomponents/cdk-dynamodb-seeder.InlineSeeds", version: "1.39.0" };
/**
 * Seeds from a local json file.
 */
class JsonFileSeeds extends Seeds {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.options = options;
    }
    /**
     * Called when the seeder is initialized to allow this object to bind to the stack.
     */
    bind(scope) {
        // If the same JsonFileSeeds is used multiple times, retain only the first instantiation.
        if (!this.asset) {
            this.asset = new aws_s3_assets_1.Asset(scope, 'JsonFileSeeds', {
                path: this.path,
                ...this.options,
            });
        }
        try {
            JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        }
        catch (e) {
            throw new Error('Could not convert file to JSON');
        }
        return {
            s3Location: {
                bucketName: this.asset.s3BucketName,
                objectKey: this.asset.s3ObjectKey,
            },
        };
    }
}
exports.JsonFileSeeds = JsonFileSeeds;
_d = JSII_RTTI_SYMBOL_1;
JsonFileSeeds[_d] = { fqn: "@cloudcomponents/cdk-dynamodb-seeder.JsonFileSeeds", version: "1.39.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2VlZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5QkFBeUI7QUFFekIsMERBQTZEO0FBRzdELE1BQXNCLEtBQUs7Ozs7Ozs7SUFPbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFlLEVBQUUsR0FBVyxFQUFFLGFBQXNCO1FBQzNFLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQU1NLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBZ0M7UUFDdkQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7OztJQVFNLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBWSxFQUFFLE9BQXNCO1FBQzdELE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7O0FBM0JILHNCQW9DQzs7Ozs7O0FBaUJELE1BQWEsT0FBUSxTQUFRLEtBQUs7SUFHaEMsWUFBWSxNQUFlLEVBQVUsR0FBVyxFQUFVLGFBQXNCO1FBQzlFLEtBQUssRUFBRSxDQUFDO1FBRDJCLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBUztRQUc5RSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLElBQUksQ0FBQyxNQUFpQjtRQUMzQixPQUFPO1lBQ0wsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNuQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDbEM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7QUFyQkgsMEJBc0JDOzs7Ozs7QUFLRCxNQUFhLFdBQVksU0FBUSxLQUFLO0lBQ3BDLFlBQW9CLEtBQWE7UUFDL0IsS0FBSyxFQUFFLENBQUM7UUFEVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBRy9CLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN2RjtJQUNILENBQUM7Ozs7SUFFTSxJQUFJLENBQUMsTUFBaUI7UUFDM0IsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSztTQUN4QixDQUFDO0lBQ0osQ0FBQzs7QUFqQkgsa0NBa0JDOzs7Ozs7QUFLRCxNQUFhLGFBQWMsU0FBUSxLQUFLO0lBR3RDLFlBQTRCLElBQVksRUFBbUIsVUFBd0IsRUFBRTtRQUNuRixLQUFLLEVBQUUsQ0FBQztRQURrQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQW1CLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBRXJGLENBQUM7Ozs7SUFFTSxJQUFJLENBQUMsS0FBZ0I7UUFDMUIseUZBQXlGO1FBQ3pGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHFCQUFLLENBQUMsS0FBSyxFQUFFLGVBQWUsRUFBRTtnQkFDN0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO2dCQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2FBQ2xDO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0FBNUJILHNDQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IElCdWNrZXQsIExvY2F0aW9uIH0gZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldE9wdGlvbnMgfSBmcm9tICdAYXdzLWNkay9hd3MtczMtYXNzZXRzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VlZHMge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBwdWJsaWMgc3RhdGljIGZyb21CdWNrZXQoYnVja2V0OiBJQnVja2V0LCBrZXk6IHN0cmluZywgb2JqZWN0VmVyc2lvbj86IHN0cmluZyk6IFMzU2VlZHMge1xuICAgIHJldHVybiBuZXcgUzNTZWVkcyhidWNrZXQsIGtleSwgb2JqZWN0VmVyc2lvbik7XG4gIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBwdWJsaWMgc3RhdGljIGZyb21JbmxpbmUoc2VlZHM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+W10pOiBJbmxpbmVTZWVkcyB7XG4gICAgcmV0dXJuIG5ldyBJbmxpbmVTZWVkcyhKU09OLnN0cmluZ2lmeShzZWVkcykpO1xuICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICBwdWJsaWMgc3RhdGljIGZyb21Kc29uRmlsZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBBc3NldE9wdGlvbnMpOiBKc29uRmlsZVNlZWRzIHtcbiAgICByZXR1cm4gbmV3IEpzb25GaWxlU2VlZHMocGF0aCwgb3B0aW9ucyk7XG4gIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIHB1YmxpYyBhYnN0cmFjdCBiaW5kKHNjb3BlOiBDb25zdHJ1Y3QpOiBTZWVkc0NvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWVkc0NvbmZpZyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIHJlYWRvbmx5IHMzTG9jYXRpb24/OiBMb2NhdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gIHJlYWRvbmx5IGlubGluZVNlZWRzPzogc3RyaW5nO1xufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbmV4cG9ydCBjbGFzcyBTM1NlZWRzIGV4dGVuZHMgU2VlZHMge1xuICBwcml2YXRlIGJ1Y2tldE5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihidWNrZXQ6IElCdWNrZXQsIHByaXZhdGUga2V5OiBzdHJpbmcsIHByaXZhdGUgb2JqZWN0VmVyc2lvbj86IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoIWJ1Y2tldC5idWNrZXROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1Y2tldE5hbWUgaXMgdW5kZWZpbmVkIGZvciB0aGUgcHJvdmlkZWQgYnVja2V0Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5idWNrZXROYW1lID0gYnVja2V0LmJ1Y2tldE5hbWU7XG4gIH1cblxuICBwdWJsaWMgYmluZChfc2NvcGU6IENvbnN0cnVjdCk6IFNlZWRzQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgczNMb2NhdGlvbjoge1xuICAgICAgICBidWNrZXROYW1lOiB0aGlzLmJ1Y2tldE5hbWUsXG4gICAgICAgIG9iamVjdEtleTogdGhpcy5rZXksXG4gICAgICAgIG9iamVjdFZlcnNpb246IHRoaXMub2JqZWN0VmVyc2lvbixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNsYXNzIElubGluZVNlZWRzIGV4dGVuZHMgU2VlZHMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlZWRzOiBzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKHNlZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmxpbmUgc2VlZHMgY2Fubm90IGJlIGVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKHNlZWRzLmxlbmd0aCA+IDQwOTYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW5saW5lIHNlZWRzIGFyZSB0b28gbGFyZ2UsIG11c3QgYmUgPD0gNDA5NiBidXQgaXMgJHtzZWVkcy5sZW5ndGh9YCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGJpbmQoX3Njb3BlOiBDb25zdHJ1Y3QpOiBTZWVkc0NvbmZpZyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlubGluZVNlZWRzOiB0aGlzLnNlZWRzLFxuICAgIH07XG4gIH1cbn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuZXhwb3J0IGNsYXNzIEpzb25GaWxlU2VlZHMgZXh0ZW5kcyBTZWVkcyB7XG4gIHByaXZhdGUgYXNzZXQ/OiBBc3NldDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGF0aDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IEFzc2V0T3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBiaW5kKHNjb3BlOiBDb25zdHJ1Y3QpOiBTZWVkc0NvbmZpZyB7XG4gICAgLy8gSWYgdGhlIHNhbWUgSnNvbkZpbGVTZWVkcyBpcyB1c2VkIG11bHRpcGxlIHRpbWVzLCByZXRhaW4gb25seSB0aGUgZmlyc3QgaW5zdGFudGlhdGlvbi5cbiAgICBpZiAoIXRoaXMuYXNzZXQpIHtcbiAgICAgIHRoaXMuYXNzZXQgPSBuZXcgQXNzZXQoc2NvcGUsICdKc29uRmlsZVNlZWRzJywge1xuICAgICAgICBwYXRoOiB0aGlzLnBhdGgsXG4gICAgICAgIC4uLnRoaXMub3B0aW9ucyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh0aGlzLnBhdGgsICd1dGYtOCcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBjb252ZXJ0IGZpbGUgdG8gSlNPTicpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzM0xvY2F0aW9uOiB7XG4gICAgICAgIGJ1Y2tldE5hbWU6IHRoaXMuYXNzZXQuczNCdWNrZXROYW1lLFxuICAgICAgICBvYmplY3RLZXk6IHRoaXMuYXNzZXQuczNPYmplY3RLZXksXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==
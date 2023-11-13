"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBSeeder = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const path = require("path");
const aws_iam_1 = require("@aws-cdk/aws-iam");
const aws_lambda_1 = require("@aws-cdk/aws-lambda");
const aws_s3_1 = require("@aws-cdk/aws-s3");
const core_1 = require("@aws-cdk/core");
class DynamoDBSeeder extends core_1.Construct {
    constructor(scope, id, props) {
        var _b, _c, _d, _e;
        super(scope, id);
        const seeds = props.seeds.bind(this);
        const seedsBucket = ((_b = seeds.s3Location) === null || _b === void 0 ? void 0 : _b.bucketName) ? aws_s3_1.Bucket.fromBucketName(this, 'SeedsBucket', seeds.s3Location.bucketName) : undefined;
        const handler = new aws_lambda_1.SingletonFunction(this, 'CustomResourceHandler', {
            uuid: 'Custom::DynamodbSeeder',
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
            code: aws_lambda_1.Code.fromAsset(path.join(__dirname, 'lambdas', 'dynamodb-seeder')),
            handler: 'index.handler',
            lambdaPurpose: 'Custom::DynamodbSeeder',
            timeout: (_c = props.timeout) !== null && _c !== void 0 ? _c : core_1.Duration.minutes(15),
        });
        handler.addToRolePolicy(new aws_iam_1.PolicyStatement({
            effect: aws_iam_1.Effect.ALLOW,
            actions: ['dynamodb:BatchWriteItem'],
            resources: [props.table.tableArn],
        }));
        if (props.table.encryptionKey) {
            handler.addToRolePolicy(new aws_iam_1.PolicyStatement({
                effect: aws_iam_1.Effect.ALLOW,
                actions: ['kms:Encrypt', 'kms:Decrypt', 'kms:ReEncrypt*', 'kms:GenerateDataKey*', 'kms:DescribeKey', 'kms:CreateGrant'],
                resources: [props.table.encryptionKey.keyArn],
            }));
        }
        if (seedsBucket) {
            const objectKey = (_e = (_d = seeds.s3Location) === null || _d === void 0 ? void 0 : _d.objectKey) !== null && _e !== void 0 ? _e : '*';
            handler.addToRolePolicy(new aws_iam_1.PolicyStatement({
                effect: aws_iam_1.Effect.ALLOW,
                actions: ['s3:GetObject'],
                resources: [seedsBucket.arnForObjects(objectKey)],
            }));
        }
        new core_1.CustomResource(this, 'CustomResource', {
            serviceToken: handler.functionArn,
            resourceType: 'Custom::DynamodbSeeder',
            properties: {
                TableName: props.table.tableName,
                Seeds: {
                    InlineSeeds: seeds.inlineSeeds,
                    S3Bucket: seeds.s3Location && seeds.s3Location.bucketName,
                    S3Key: seeds.s3Location && seeds.s3Location.objectKey,
                    S3ObjectVersion: seeds.s3Location && seeds.s3Location.objectVersion,
                },
            },
        });
    }
}
exports.DynamoDBSeeder = DynamoDBSeeder;
_a = JSII_RTTI_SYMBOL_1;
DynamoDBSeeder[_a] = { fqn: "@cloudcomponents/cdk-dynamodb-seeder.DynamoDBSeeder", version: "1.39.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1vZGItc2VlZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2R5bmFtb2RiLXNlZWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZCQUE2QjtBQUU3Qiw4Q0FBMkQ7QUFDM0Qsb0RBQXVFO0FBQ3ZFLDRDQUF5QztBQUN6Qyx3Q0FBb0U7QUFrQnBFLE1BQWEsY0FBZSxTQUFRLGdCQUFTO0lBQzNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBMEI7O1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxXQUFXLEdBQUcsT0FBQSxLQUFLLENBQUMsVUFBVSwwQ0FBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLGVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFdkksTUFBTSxPQUFPLEdBQUcsSUFBSSw4QkFBaUIsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDbkUsSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN4RSxPQUFPLEVBQUUsZUFBZTtZQUN4QixhQUFhLEVBQUUsd0JBQXdCO1lBQ3ZDLE9BQU8sUUFBRSxLQUFLLENBQUMsT0FBTyxtQ0FBSSxlQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUMvQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsZUFBZSxDQUNyQixJQUFJLHlCQUFlLENBQUM7WUFDbEIsTUFBTSxFQUFFLGdCQUFNLENBQUMsS0FBSztZQUNwQixPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztZQUNwQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUNsQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDN0IsT0FBTyxDQUFDLGVBQWUsQ0FDckIsSUFBSSx5QkFBZSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO2dCQUNwQixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO2dCQUN2SCxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDOUMsQ0FBQyxDQUNILENBQUM7U0FDSDtRQUVELElBQUksV0FBVyxFQUFFO1lBQ2YsTUFBTSxTQUFTLGVBQUcsS0FBSyxDQUFDLFVBQVUsMENBQUUsU0FBUyxtQ0FBSSxHQUFHLENBQUM7WUFFckQsT0FBTyxDQUFDLGVBQWUsQ0FDckIsSUFBSSx5QkFBZSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO2dCQUNwQixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDbEQsQ0FBQyxDQUNILENBQUM7U0FDSDtRQUVELElBQUkscUJBQWMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDekMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2pDLFlBQVksRUFBRSx3QkFBd0I7WUFDdEMsVUFBVSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQ2hDLEtBQUssRUFBRTtvQkFDTCxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzlCLFFBQVEsRUFBRSxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVTtvQkFDekQsS0FBSyxFQUFFLEtBQUssQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTO29CQUNyRCxlQUFlLEVBQUUsS0FBSyxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWE7aUJBQ3BFO2FBQ0Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztBQTNESCx3Q0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgSVRhYmxlIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcbmltcG9ydCB7IEVmZmVjdCwgUG9saWN5U3RhdGVtZW50IH0gZnJvbSAnQGF3cy1jZGsvYXdzLWlhbSc7XG5pbXBvcnQgeyBTaW5nbGV0b25GdW5jdGlvbiwgUnVudGltZSwgQ29kZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgQnVja2V0IH0gZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbmltcG9ydCB7IENvbnN0cnVjdCwgQ3VzdG9tUmVzb3VyY2UsIER1cmF0aW9uIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmltcG9ydCB7IFNlZWRzIH0gZnJvbSAnLi9zZWVkcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1vREJTZWVkZXJQcm9wcyB7XG4gIHJlYWRvbmx5IHRhYmxlOiBJVGFibGU7XG4gIHJlYWRvbmx5IHNlZWRzOiBTZWVkcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICByZWFkb25seSB0aW1lb3V0PzogRHVyYXRpb247XG59XG5cbmV4cG9ydCBjbGFzcyBEeW5hbW9EQlNlZWRlciBleHRlbmRzIENvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBEeW5hbW9EQlNlZWRlclByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHNlZWRzID0gcHJvcHMuc2VlZHMuYmluZCh0aGlzKTtcbiAgICBjb25zdCBzZWVkc0J1Y2tldCA9IHNlZWRzLnMzTG9jYXRpb24/LmJ1Y2tldE5hbWUgPyBCdWNrZXQuZnJvbUJ1Y2tldE5hbWUodGhpcywgJ1NlZWRzQnVja2V0Jywgc2VlZHMuczNMb2NhdGlvbi5idWNrZXROYW1lKSA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgU2luZ2xldG9uRnVuY3Rpb24odGhpcywgJ0N1c3RvbVJlc291cmNlSGFuZGxlcicsIHtcbiAgICAgIHV1aWQ6ICdDdXN0b206OkR5bmFtb2RiU2VlZGVyJyxcbiAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBDb2RlLmZyb21Bc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCAnbGFtYmRhcycsICdkeW5hbW9kYi1zZWVkZXInKSksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBsYW1iZGFQdXJwb3NlOiAnQ3VzdG9tOjpEeW5hbW9kYlNlZWRlcicsXG4gICAgICB0aW1lb3V0OiBwcm9wcy50aW1lb3V0ID8/IER1cmF0aW9uLm1pbnV0ZXMoMTUpLFxuICAgIH0pO1xuXG4gICAgaGFuZGxlci5hZGRUb1JvbGVQb2xpY3koXG4gICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXG4gICAgICAgIGFjdGlvbnM6IFsnZHluYW1vZGI6QmF0Y2hXcml0ZUl0ZW0nXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbcHJvcHMudGFibGUudGFibGVBcm5dLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGlmIChwcm9wcy50YWJsZS5lbmNyeXB0aW9uS2V5KSB7XG4gICAgICBoYW5kbGVyLmFkZFRvUm9sZVBvbGljeShcbiAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXG4gICAgICAgICAgYWN0aW9uczogWydrbXM6RW5jcnlwdCcsICdrbXM6RGVjcnlwdCcsICdrbXM6UmVFbmNyeXB0KicsICdrbXM6R2VuZXJhdGVEYXRhS2V5KicsICdrbXM6RGVzY3JpYmVLZXknLCAna21zOkNyZWF0ZUdyYW50J10sXG4gICAgICAgICAgcmVzb3VyY2VzOiBbcHJvcHMudGFibGUuZW5jcnlwdGlvbktleS5rZXlBcm5dLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHNlZWRzQnVja2V0KSB7XG4gICAgICBjb25zdCBvYmplY3RLZXkgPSBzZWVkcy5zM0xvY2F0aW9uPy5vYmplY3RLZXkgPz8gJyonO1xuXG4gICAgICBoYW5kbGVyLmFkZFRvUm9sZVBvbGljeShcbiAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgICAgZWZmZWN0OiBFZmZlY3QuQUxMT1csXG4gICAgICAgICAgYWN0aW9uczogWydzMzpHZXRPYmplY3QnXSxcbiAgICAgICAgICByZXNvdXJjZXM6IFtzZWVkc0J1Y2tldC5hcm5Gb3JPYmplY3RzKG9iamVjdEtleSldLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbmV3IEN1c3RvbVJlc291cmNlKHRoaXMsICdDdXN0b21SZXNvdXJjZScsIHtcbiAgICAgIHNlcnZpY2VUb2tlbjogaGFuZGxlci5mdW5jdGlvbkFybixcbiAgICAgIHJlc291cmNlVHlwZTogJ0N1c3RvbTo6RHluYW1vZGJTZWVkZXInLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBUYWJsZU5hbWU6IHByb3BzLnRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgU2VlZHM6IHtcbiAgICAgICAgICBJbmxpbmVTZWVkczogc2VlZHMuaW5saW5lU2VlZHMsXG4gICAgICAgICAgUzNCdWNrZXQ6IHNlZWRzLnMzTG9jYXRpb24gJiYgc2VlZHMuczNMb2NhdGlvbi5idWNrZXROYW1lLFxuICAgICAgICAgIFMzS2V5OiBzZWVkcy5zM0xvY2F0aW9uICYmIHNlZWRzLnMzTG9jYXRpb24ub2JqZWN0S2V5LFxuICAgICAgICAgIFMzT2JqZWN0VmVyc2lvbjogc2VlZHMuczNMb2NhdGlvbiAmJiBzZWVkcy5zM0xvY2F0aW9uLm9iamVjdFZlcnNpb24sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=

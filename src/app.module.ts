import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './infrastructure/database/database.module';
import { GraphQLModule } from './infrastructure/graphql/graphql.module';
import { BullModule } from '@nestjs/bull';
import { RankingQueueModule } from './infrastructure/queue/ranking-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
    }),
    DatabaseModule,
    GraphQLModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
      },
      prefix: 'mma-platform',
      limiter: {
        max: 1000,
        duration: 5000,
      },
    }),
    RankingQueueModule,
  ],
})
export class AppModule {}

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# MMA Platform Backend

## Overview
This backend provides a robust, modular, and scalable API for managing MMA fighters, events, fights, and rankings. It is built with NestJS, TypeORM, GraphQL, and follows CLEAN Architecture principles.

## Features
- Fighter profiles with detailed stats
- Event and fight management
- Dynamic rankings by weight class
- Background ranking updates after fight results
- GraphQL API for all operations
- Title fight tracking
- Comprehensive fight statistics

## Architecture
- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases and services
- **Infrastructure Layer**: External services, repositories, and GraphQL implementation
- **Presentation Layer**: GraphQL resolvers and types

## Ranking Algorithm
- **Win via Knockout or Submission:** 4 points
- **Win via Decision:** 3 points
- **Draw:** 1 point
- **Loss:** 0 points
- **Tiebreakers:** Win percentage or most recent activity

Rankings are recalculated in the background after each fight result is recorded, ensuring a responsive API for users.

## Background Ranking Update
- When a fight is marked as completed, a background job is enqueued
- The job updates the ranking points and statistics for both winner and loser
- Rankings are updated per weight class
- Implemented using BullMQ and NestJS Bull

## API Usage Examples

### Query Fighters
```graphql
query {
  fighters {
    id
    firstName
    lastName
    nickname
    weightClass {
      name
      weightLimit
    }
    wins
    losses
    draws
    knockouts
    submissions
    rankingPoints
  }
}
```

### Create a Fighter
```graphql
mutation {
  createFighter(
    firstName: "John"
    lastName: "Doe"
    nickname: "The Destroyer"
    weightClassId: "..."
    nationality: "USA"
    height: "6'0"
    weight: 185
    reach: "76"
    stance: "Orthodox"
  ) {
    id
    firstName
    lastName
    weightClass { name }
  }
}
```

### Create an Event
```graphql
mutation {
  createEvent(
    name: "UFC 300"
    date: "2024-04-13"
    location: "Las Vegas"
    venue: "T-Mobile Arena"
    description: "Historic UFC event"
  ) {
    id
    name
    date
    location
  }
}
```

### Create a Fight
```graphql
mutation {
  createFight(
    eventId: "..."
    fighter1Id: "..."
    fighter2Id: "..."
    round: 3
    isTitleFight: true
  ) {
    id
    isCompleted
    isTitleFight
  }
}
```

### Mark Fight as Completed
```graphql
mutation {
  markFightAsCompleted(
    id: "..."
    winnerId: "..."
    loserId: "..."
    result: "KNOCKOUT"
    round: 2
    time: "3:15"
  ) {
    id
    isCompleted
    winnerId
    result
  }
}
```

### Get Rankings by Weight Class
```graphql
query {
  rankingsByWeightClass(weightClassId: "...") {
    id
    firstName
    lastName
    rankingPoints
    wins
    losses
    draws
  }
}
```

## Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database and Redis connection details
4. Start Redis server
5. Run the application:
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run start:prod
   ```

## Database Schema
See `schema.sql` for the complete database schema.

## Entity Relationship Diagram
See `erd.txt` for the Entity Relationship Diagram.

## Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure
```
src/
├── domain/           # Domain layer
│   ├── entities/     # Core business entities
│   └── repositories/ # Repository interfaces
├── application/      # Application layer
│   └── services/     # Business logic services
└── infrastructure/   # Infrastructure layer
    ├── database/     # Database configuration
    ├── graphql/      # GraphQL implementation
    ├── queue/        # Background job processing
    └── repositories/ # Repository implementations
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

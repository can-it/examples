import { Module } from '@nestjs/common';
import { CanItModule } from '@can-it/nest';
import { PolicyState } from '@can-it/types';
import { Request } from 'express';
import { RelationComparator } from '@can-it/operators-relation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../features/cats/cats.module';
import { DatabaseModule } from '../integrations/database/database.module';
import { PolicyModule } from '../features/policies/policy.module';

@Module({
  imports: [
    CanItModule,
    DatabaseModule,

    CatsModule,
    PolicyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // configure the can it options
    ...CanItModule.withProviders({
      comparators: {
        action: new RelationComparator(
          ['view', 'edit'],
          { edit: ['view'] }
        )
      },
      resolvers: {
        ri: (req: Request) => req.params.id || req.path.replace(/\/$/, '').split('/').pop(),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        policy: (_req: Request): PolicyState => {
          return {
            allow: [
              // ['view', 'cats'],
              ['edit', 'cats']
            ],
            deny: [
              ['edit', 'cats']
            ]
          }
        }
      }
    }),
    // Register app guard
    CanItModule.registerAppGuard()
  ],
})
export class AppModule {}

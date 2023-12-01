import { Module } from '@nestjs/common';
import { CAN_IT_CONFIGURATION, CanItConfiguration, CanItGuard } from '@can-it/nest';
import { Request } from 'express';
import { RelationComparator } from '@can-it/operators-relation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../features/cats/cats.module';
import { DatabaseModule } from '../integrations/database/database.module';
import { PolicyModule } from '../features/policies/policy.module';
import { APP_GUARD, ModuleRef } from '@nestjs/core';
import { PolicyService } from '../integrations/database/services/policy.service';

@Module({
  imports: [
    DatabaseModule,

    CatsModule,
    PolicyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: CAN_IT_CONFIGURATION,
      useFactory: (thisModule: ModuleRef): CanItConfiguration => {
        const policyService = thisModule.get(PolicyService, { strict: false });
        return {
          comparators: {
            action: new RelationComparator(
              ['view', 'edit', 'delete'],
              { edit: ['view'] }
            )
          },
          resolvers: {
            ri: (req: Request) => req.params.id || req.path.replace(/\/$/, '').split('/').pop(),
            policy: () => policyService.get()
          }
        }
      },
      inject: [ModuleRef]
    },
    {
      provide: APP_GUARD,
      useClass: CanItGuard
    }
  ],
})
export class AppModule {}

import { ExecutionContext, Module } from '@nestjs/common';
import { CanItConfiguration, CanItGuard, CanItModule } from '@can-it/nest';
import { RelationComparator } from '@can-it/operators-relation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../features/cats/cats.module';
import { DatabaseModule } from '../integrations/database/database.module';
import { PolicyModule } from '../features/policies/policy.module';
import { APP_GUARD, ModuleRef } from '@nestjs/core';
import { PolicyService } from '../integrations/database/services/policy.service';

const canItConfiguration: CanItConfiguration = {
  comparators: {
    action: new RelationComparator(
      ['view', 'edit', 'delete'],
      { edit: ['view'] }
    )
  },
  resolvers: {
    ri: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      return req.params.id || req.path.replace(/\/$/, '').split('/').pop()
    },
    policy: (_context: ExecutionContext, thisModule: ModuleRef) => {
      const policyService = thisModule.get(PolicyService, { strict: false });
      return policyService.get();
    }
  }
};

@Module({
  imports: [
    DatabaseModule,

    CatsModule,
    PolicyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CanItModule.configure(canItConfiguration),
    {
      provide: APP_GUARD,
      useClass: CanItGuard
    }
  ],
})
export class AppModule {}

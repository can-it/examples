import { Module } from '@nestjs/common';
import { CanItGuard, CanItModule } from '@can-it/nest';
import { PolicyState } from '@can-it/types';
import { Request } from 'express';
import { RelationComparator } from '@can-it/operators-relation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CanItModule.register({
      comparators: {
        action: new RelationComparator(
          ['view', 'click'],
          { click: ['view'] }
        )
      },
      resolvers: {
        ri: (req: Request) => req.params.id || req.path.split('/').pop(),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        policy: (_req: Request): PolicyState => {
          return {
            allow: [
              ['view', 'cats'],
              ['click', 'cats']
            ],
            deny: [
              ['click', 'cats']
            ]
          }
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CanItGuard
    }
  ],
})
export class AppModule {}

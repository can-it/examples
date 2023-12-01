import { PolicyState } from '@can-it/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyService {
  private policy: PolicyState = {
    allow: [
      ['view', 'cats'],
      ['edit', 'cats'],
      ['delete', 'cats']
    ],
    deny: [
      ['edit', 'cats']
    ]
  }

  get() {
    return this.policy;
  }

  update(policy: PolicyState) {
    this.policy = policy
  }
}

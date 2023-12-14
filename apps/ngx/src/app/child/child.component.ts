import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CanItService, PolicyStore } from '@can-it/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy {
  @HostBinding('class.correct')
  correct!: boolean;

  private sub!: Subscription;

  constructor(
    private canIt: CanItService,
    private policyStore: PolicyStore
  ) {}

  ngOnInit(): void {
    this.policyStore.set({
      allow: [
        ['click', 'document']
      ]
    });
    this.sub = this.canIt.allowTo('view', 'document')
      .subscribe(can => this.correct = !can);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

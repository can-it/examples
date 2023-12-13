import { Component, OnInit } from '@angular/core';
import { PolicyStore } from '@can-it/ngx';
import { PolicyState, Request } from '@can-it/types';
import { Observable, first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'examples';
  deniedClick = false;
  allowedView = true;
  allowedClick = true;
  currentPolicy$!: Observable<PolicyState>;

  constructor(
    private policyStore: PolicyStore
  ) {}

  ngOnInit(): void {
    this.policyStore.set({
      allow: [
        ['click', 'documents'],
        ['view', 'documents']
      ]
    });

    this.currentPolicy$ = this.policyStore.get();
  }

  toggleClick() {
    this.allowedClick = !this.allowedClick;
    this.currentPolicy$.pipe(first()).subscribe(state => {
      if (this.allowedClick) {
        this.policyStore.set({ ...state, allow: state.allow.concat([['click', 'documents']]) });
        return;
      }
      this.policyStore.set({ ...state, allow: state.allow.filter(p => p[0] !== 'click') });
    });
  }

  toggleView() {
    this.allowedView = !this.allowedView;
    this.currentPolicy$.pipe(first()).subscribe(state => {
      if (this.allowedView) {
        this.policyStore.set({ ...state, allow: state.allow.concat([['view', 'documents']]) });
        return;
      }
      this.policyStore.set({ ...state, allow: state.allow.filter(p => p[0] !== 'view') });
    });
  }

  toggleDenyClick() {
    this.deniedClick = !this.deniedClick;
    this.currentPolicy$.pipe(first()).subscribe(state => {
      if (this.deniedClick) {
        this.policyStore.set({ ...state, deny: (state.deny || []).concat([['click', 'documents']]) });
        return;
      }
      this.policyStore.set({ ...state, deny: state.deny?.filter((p: Request) => p[0] !== 'click') });
    });
  }
}

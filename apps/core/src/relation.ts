import { CanIt } from '@can-it/core';
import { RelationComparator } from '@can-it/operators-relation';

const relationComparator = new RelationComparator(
  ['view', 'edit', 'delete'],
  {
    edit: ['view']
  }
)

const canIt = new CanIt(
  {
    allow: [
      ['view', 'docs'],
      ['edit', 'docs'],
      ['delete', 'docs'],
    ],
    deny: [
      ['edit', 'docs'],
    ]
  },
  relationComparator
);


console.log('👉👉 CanIt with Relation Comparator Action');

console.log(canIt.allowTo('view', 'docs')); // true, even the "edit" action was deny, and "view" is its children action, but we can perform the "view" action
console.log(canIt.allowTo('delete', 'docs')); // true
console.log(canIt.allowTo('edit', 'docs')); // false, because it's appeared in the "deny" permissions list

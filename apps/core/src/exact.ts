import { CanIt } from '@can-it/core';

const canIt = new CanIt({
  allow: [
    ['view', 'docs'],
    ['click', 'docs'],
    ['delete', 'docs']
  ],
  deny: [
    ['delete', 'docs']
  ]
});

console.log('Can It with default exact comparator');
console.log(canIt.allowTo('view', 'docs')); // true
console.log(canIt.allowTo('click', 'docs')); // true
console.log(canIt.allowTo('delete', 'docs')); // false, because it is appeared in deny list above

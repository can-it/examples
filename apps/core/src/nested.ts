import { CanIt } from '@can-it/core';
import { NestedComparator, NestedGenerator } from '@can-it/operators-nested';

const nestedComparator = new NestedComparator();
const nestedGenerator = new NestedGenerator();

const canIt = new CanIt(
  {
    allow: [
      // can listing all docs and its children resources
      ['view', 'orgs::org-1::docs'],
      // can view all products and its children resources that belongs to any organizations
      ['view', nestedGenerator.transform('orgs', '', 'products')], // orgs::*::products
      // can edit all any specific products that belongs to any organizations
      ['edit', nestedGenerator.transform('orgs', '', 'products', '')], // orgs::*::products::*
    ],
    deny: [
      // can not view any products and its children resources in org-2
      ['view', 'orgs::org-2::products'],
      // can not view any products and its children resources in org-2
      ['view', 'orgs::org-3::products::*']
    ]
  },
  null,
  nestedComparator
);

console.log('👉👉 Can It with Nested RI Comparator');
console.log('- case "view"');
console.log(canIt.allowTo('view', 'orgs::org-1::docs')); // true

console.log(canIt.allowTo('view', 'orgs::org-1::products')); // true
console.log(canIt.allowTo('view', 'orgs::org-1::products::product-1')); // true
console.log(canIt.allowTo('view', 'orgs::org-1::products::product-1::prices')); // true

console.log('- case "edit"');
console.log(canIt.allowTo('edit', 'orgs::org-1::products')); // true
console.log(canIt.allowTo('edit', 'orgs::org-1::products::product-1')); // true
console.log(canIt.allowTo('edit', 'orgs::org-1::products::product-1::prices'));
// => false, because it's limitted to product, but product's children resources

// Deny permission
console.log('- case "deny" view org-2');
console.log(canIt.allowTo('view', 'orgs::org-2::products')); // false
console.log(canIt.allowTo('view', 'orgs::org-2::products::product-1')); // false
console.log(canIt.allowTo('view', 'orgs::org-2::products::product-1::prices')); // false

console.log('- case "deny" view org-3');
console.log(canIt.allowTo('view', 'orgs::org-3::products')); // false
console.log(canIt.allowTo('view', 'orgs::org-3::products::product-1')); // false
console.log(canIt.allowTo('view', 'orgs::org-3::products::product-1::prices'));
// => true, because only denying at products resources, not its children resources

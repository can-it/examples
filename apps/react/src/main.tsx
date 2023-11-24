import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { CanItProvider } from '@can-it/react';
import { RelationComparator } from '@can-it/operators-relation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const relationComparator = new RelationComparator(
  ['view', 'click'],
  {
    click: ['view']
  }
);

root.render(
  <StrictMode>
    <BrowserRouter>
      {/* <CanItProvider> */}
      <CanItProvider comparators={{ action: relationComparator }}>
        <App />
      </CanItProvider>
    </BrowserRouter>
  </StrictMode>
);

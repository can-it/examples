// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { CanIt } from '@can-it/react';
import { CurrentPolicy } from './components/current-policy';
import { Documentations } from './components/documentations';
import { PolicyManagement } from './components/policy-management';
export function App() {
  return (
    <div className='wrapper'>
      <div className="container">
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome to @can-it/react 👋
          </h1>
        </div>
        <div className="row p-3">
          <PolicyManagement />
        </div>
        <div className="row">
          <div className="col p-3">
            <CanIt allowTo={['view', 'docs']}>
              <Documentations></Documentations>
            </CanIt>
          </div>
          <div className="col p-3">
            <CurrentPolicy></CurrentPolicy>
          </div>
        </div>

        {/* <NxWelcome title="examples" /> */}

        <p id="love">
          Carefully crafted with
          <svg
            fill="currentColor"
            stroke="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </p>
      </div>
    </div>
  );
}

export default App;

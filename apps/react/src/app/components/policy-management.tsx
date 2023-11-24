import { useEffect, useState } from 'react';
import { usePolicyStore } from '@can-it/react';
export function PolicyManagement() {
  const { update, set } = usePolicyStore();
  const [denyClick, setDenyClick] = useState(false);
  const [enableView, setEnableView] = useState(true);
  const [enableClick, setEnableClick] = useState(true);

  useEffect(() => {
    set({
      allow: [
        ['view', 'docs'],
        ['click', 'docs'],
      ]
    });
  }, []);

  const toggleDenyClick = () => {
    const newDenyClick = !denyClick;
    update(policy => {
      if (!policy) {
        return policy;
      }
      if (newDenyClick) {
        return ({ ...policy, deny: (policy?.deny || []).concat([['click', 'docs']])});
      }
      return ({ ...policy, deny: policy?.deny?.filter(p => p[0] !== 'click')});
    })

    setDenyClick(newDenyClick);
  }

  const toggleView = () => {
    const newEnableView = !enableView;
    update(policy => {
      if (!policy) {
        return policy;
      }
      if (newEnableView) {
        return ({ ...policy, allow: (policy?.allow || []).concat([['view', 'docs']])});
      }
      return ({ ...policy, allow: policy?.allow?.filter(p => p[0] !== 'view')});
    })

    setEnableView(newEnableView);
  }

  const toggleClick = () => {
    const newEnableClick = !enableClick;
    update(policy => {
      if (!policy) {
        return policy;
      }
      if (newEnableClick) {
        return ({ ...policy, allow: (policy?.allow || []).concat([['click', 'docs']])});
      }
      return ({ ...policy, allow: policy?.allow?.filter(p => p[0] !== 'click')});
    })

    setEnableClick(newEnableClick);
  }


  return (<div className="w-100">
    <h2>You can click at any buttons bellow to modify the permissions</h2>
    <div className='flex justify-center'>
      <button className="btn m-3" onClick={toggleDenyClick}>{denyClick ? 'Remove ' : ''} Deny Click</button>
      <button className="btn m-3" onClick={toggleClick}>{enableClick ? 'Remove ' : ''} Allow Click</button>
      <button className="btn m-3" onClick={toggleView}>{enableView ? 'Remove ' : ''} Enable View</button>
    </div>
  </div>)
}

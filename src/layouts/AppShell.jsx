import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from '../design-system/index.js';

const TAB_ROUTES = {
  today: '/today',
  map: '/map',
  circle: '/circle',
  me: '/me',
};

function getActiveTab(pathname) {
  if (pathname.startsWith('/map')) return 'map';
  if (pathname.startsWith('/circle')) return 'circle';
  if (pathname.startsWith('/me')) return 'me';
  return 'today';
}

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = getActiveTab(location.pathname);

  function handleTabChange(key) {
    navigate(TAB_ROUTES[key]);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      background: 'var(--bg-0)',
    }}>
      <main style={{
        flex: 1,
        overflow: 'auto',
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}>
        <Outlet />
      </main>

      <div style={{
        flexShrink: 0,
        paddingBottom: 'env(safe-area-inset-bottom)',
        background: 'var(--bg-1)',
      }}>
        <TabBar active={active} onChange={handleTabChange} />
      </div>
    </div>
  );
}

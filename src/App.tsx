import { Toaster } from 'react-hot-toast';

import { AppHeaderActions } from './components/Layout/AppHeaderActions';
import { AppLayout } from './components/Layout/AppLayout';
import { Map } from './components/Map/Map';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppLayout headerActions={<AppHeaderActions />}>
        <Map />
      </AppLayout>
    </>
  );
}

export default App;

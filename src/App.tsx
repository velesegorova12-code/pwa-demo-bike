import { Toaster } from 'react-hot-toast';

import { AppHeaderActions } from './components/AppHeaderActions';
import { AppLayout } from './components/AppLayout';
import { Map } from './components/Map';

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

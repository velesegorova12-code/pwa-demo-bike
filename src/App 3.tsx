import { Toaster } from 'react-hot-toast';
import { AppLayout } from './layout/AppLayout';
import { AppHeaderActions } from './layout/AppHeaderActions';
import { Map } from './Map';

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

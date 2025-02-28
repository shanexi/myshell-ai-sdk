import * as Portals from '@ionic/portals';

export function App() {
  return (
    <button
      onClick={() => {
        Portals.publish({ topic: 'open-lui-form', data: null });
      }}
    >
      LUI Button - open LUI Form
    </button>
  );
}

export default App;

import { type Component } from 'solid-js';
import { Layout } from './components/Layout';
import { Overlay } from './components/Overlay';
import { AppProvider } from './contexts/AppContext';
import { ClockList } from './components/ClockList';
import { AddClock } from './components/AddClock';
import { Settings } from './components/Settings';

const App: Component = () => {
    return (
        <AppProvider>
            <Layout>
                <Settings />
                <ClockList />
                <Overlay>
                    <AddClock />
                </Overlay>
            </Layout>
        </AppProvider>
    );
};

export default App;

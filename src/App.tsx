import React, { useState } from 'react';
import NavBar from './components/navbar';
import Sidebar from './components/sidebar';
import InventoryList from './components/inventory_list';
import sampleData from './data/cards.json';
import MyThemeProvider from './context/MyThemeProvider';
import { FiltersProvider } from './context/FiltersProvider';
import { Provider } from 'react-redux';
import { store } from "./store/store"


const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };
    return <Provider store={store}>
        <MyThemeProvider>
            <FiltersProvider>
                <NavBar toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <main style={{ padding: 16 }}>
                    <InventoryList items={sampleData} />
                </main>
            </FiltersProvider>
        </MyThemeProvider>
    </Provider>
}

export default App;

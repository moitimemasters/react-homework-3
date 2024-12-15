import React, { useState } from 'react';
import NavBar from './components/navbar';
import Sidebar from './components/sidebar';
import InventoryList from './components/inventory_list';
import sampleData from './data/cards.json';
import MyThemeProvider from './context/MyThemeProvider';
import { FiltersProvider } from './context/FiltersProvider';


const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };
    return <MyThemeProvider>
        <FiltersProvider>
            <NavBar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main style={{ padding: 16 }}>
                <InventoryList items={sampleData} />
            </main>
        </FiltersProvider>
    </MyThemeProvider>
}

export default App;

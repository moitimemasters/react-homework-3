import React, { useState } from 'react';
import NavBar from './components/navbar';
import Sidebar from './components/sidebar';
import InventoryList from './components/inventory_list';
import MyThemeProvider from './context/MyThemeProvider';
import { Provider } from 'react-redux';
import { store } from "./store/store"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import ProductPage from './pages/product';
import CategoriesPage from './pages/category';
import UserProfilePage from './pages/user_profile.tsx';


const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };
    return <Provider store={store}>
        <MyThemeProvider>
                <BrowserRouter>
                    <NavBar toggleSidebar={toggleSidebar} />
                    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                    <main style={{ padding: 16 }}>
                        <Routes>
                            <Route path="/products" element={<InventoryList />} />
                            <Route path="/products/:id" element={<ProductPage />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/user" element={<UserProfilePage />} />
                            <Route path="*" element={<Navigate to="/products" replace />} />
                        </Routes>
                    </main>
                </BrowserRouter>
        </MyThemeProvider>
    </Provider >
}

export default App;

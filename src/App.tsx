import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import WebFont from 'webfontloader';
import './App.css';
import { PrivateRoute } from './components/Route/PrivateRoute';
import StartPage from './components/StartPage/StartPage';
import { SignedInPage } from './routes/signed';
import { AuthPage } from './pages/AuthPage';
// import Board from './components/Board/Board';

WebFont.load({
    google: {
        families: ['Rubik:300,400,700', 'Catamaran:700,900', 'sans-serif'],
    },
});

function App() {
    ConfigProvider.config({
        theme: {
            primaryColor: 'red',
        },
    });
    // ["#B3CFFF", "#91ACE5", "#6F8ACB", "#4B6AB2", "#1F4B99"]
    return (
        <ConfigProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <div className='App'>
                                <StartPage />
                            </div>
                        }
                    />
                    <Route path='/auth/signed-in' element={<SignedInPage />} />
                    <Route
                        path='*'
                        element={
                            <PrivateRoute>
                                <AuthPage />
                            </PrivateRoute>
                        }
                    />
                    {/* <Route path='/board' element={<Board />} /> */}
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;

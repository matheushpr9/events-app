import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Coloque aqui seu Header, se quiser */}
            {children}
            {/* ToastContainer global, só um! */}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                newestOnTop
                closeOnClick
                theme="colored"
            />
            {/* Coloque aqui seu Footer, se quiser */}
        </>
    );
}

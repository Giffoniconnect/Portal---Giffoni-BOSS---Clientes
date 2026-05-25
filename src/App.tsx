import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ClientPortalProvider } from "./contexts/ClientPortalContext";

// Layouts
import ClienteLayout from "./components/layout/ClienteLayout";
import ProtectedClienteRoute from "./components/ProtectedClienteRoute";

// Client pages
import ClienteLogin from "./pages/cliente/Login";
import ClienteDashboard from "./pages/cliente/Dashboard";
import ClienteDados from "./pages/cliente/Dados";
import ClienteCasos from "./pages/cliente/Casos";
import ClienteProvas from "./pages/cliente/Provas";
import ClienteInformacoes from "./pages/cliente/Informacoes";
import ClienteAudiencias from "./pages/cliente/Audiencias";
import ClientePericias from "./pages/cliente/Pericias";
import ClienteReunioes from "./pages/cliente/Reunioes";
import ClienteFinanceiro from "./pages/cliente/Financeiro";

export default function App() {
  return (
    <AuthProvider>
      <ClientPortalProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to the official global client portal login */}
            <Route path="/" element={<Navigate to="/portal-cliente-giffoni/login" replace />} />

            {/* Official Global Login Route */}
            <Route path="/portal-cliente-giffoni/login" element={<ClienteLogin />} />
            
            {/* Legacy login route - handled inside ClienteLogin with a clean redirect */}
            <Route path="/portal-cliente-giffoni/:slug/login" element={<ClienteLogin />} />
            
            {/* Core client-facing routes backed by ClienteLayout */}
            <Route 
              path="/portal-cliente-giffoni/:slug/dashboard" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteDashboard />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/dados" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteDados />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/casos" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteCasos />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/provas" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteProvas />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/informacoes" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteInformacoes />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/audiencias" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteAudiencias />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/pericias" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClientePericias />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/reunioes" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteReunioes />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />
            <Route 
              path="/portal-cliente-giffoni/:slug/financeiro" 
              element={
                <ProtectedClienteRoute>
                  <ClienteLayout>
                    <ClienteFinanceiro />
                  </ClienteLayout>
                </ProtectedClienteRoute>
              } 
            />

            {/* Global fallback redirects back to Portal login */}
            <Route path="*" element={<Navigate to="/portal-cliente-giffoni/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ClientPortalProvider>
    </AuthProvider>
  );
}

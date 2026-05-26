import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedClienteRouteProps {
  children: React.ReactElement;
}

export default function ProtectedClienteRoute({ children }: ProtectedClienteRouteProps) {
  const { session, logoutClient } = useAuth();
  const { slug } = useParams<{ slug: string }>();

  // 1. Check if a valid session exists
  if (!session || !session.autenticado) {
    return (
      <Navigate
        to={
          slug
            ? `/portal-cliente-giffoni/${slug}/login`
            : "/portal-cliente-giffoni/login"
        }
        replace
      />
    );
  }

  // 5. Safe guard: If clienteId is missing/undefined, destroy session and redirect
  if (!session.clienteId) {
    logoutClient();
    return (
      <Navigate
        to={
          slug
            ? `/portal-cliente-giffoni/${slug}/login`
            : "/portal-cliente-giffoni/login"
        }
        replace
      />
    );
  }

  // 2 & 4. If the router slug does not match the authenticated session slug, redirect them appropriately
  if (slug && slug !== session.slug) {
    return <Navigate to={`/portal-cliente-giffoni/${session.slug}/dashboard`} replace />;
  }

  return children;
}

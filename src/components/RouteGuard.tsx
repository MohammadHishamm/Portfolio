"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

/** Match routes config keys: no basePath prefix, no trailing slash (except "/"). */
function routeKeyFromPathname(pathname: string | null): string | null {
  if (!pathname) return null;
  let p = pathname;
  const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
  if (base && p.startsWith(base)) {
    p = p.slice(base.length) || "/";
  }
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
  }
  return p;
}

function isRouteEnabled(key: string | null): boolean {
  if (!key) return false;

  if (key in routes) {
    return routes[key as keyof typeof routes];
  }

  const dynamicRoutes = ["/work"] as const;
  for (const route of dynamicRoutes) {
    if (key.startsWith(route) && routes[route]) {
      return true;
    }
  }

  return false;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  // Decided during render, not in an effect, so the static HTML already holds
  // the page. Waiting for an effect meant visitors saw a spinner until every
  // script had downloaded and run.
  const key = routeKeyFromPathname(pathname);
  const routeEnabled = isRouteEnabled(key);
  const isPasswordRequired = Boolean(key && protectedRoutes[key as keyof typeof protectedRoutes]);

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(isPasswordRequired);

  useEffect(() => {
    if (!isPasswordRequired) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      setLoading(true);
      setIsAuthenticated(false);

      const response = await fetch("/api/check-auth");
      if (response.ok) {
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [isPasswordRequired, pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!routeEnabled) {
    return <NotFound />;
  }

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };

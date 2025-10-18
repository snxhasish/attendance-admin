import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { getUserToken } from "@/lib/user-token";
import Home from "@/components/app/home";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getUserToken();
        setUserToken(storedToken);
        console.log("Fetched token:", storedToken);
      } catch (err) {
        console.error("Error fetching token:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!userToken) return (
    <Redirect
      href="/login"
    />
  )

  return (
    <Home />
  );
}

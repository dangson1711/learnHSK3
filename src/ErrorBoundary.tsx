import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, info: any) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red", backgroundColor: "white", zIndex: 9999, position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.message}</pre>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

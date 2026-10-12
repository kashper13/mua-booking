import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Unexpected application error", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="mx-auto max-w-2xl px-gutter-text py-16">
          <h1 className="type-h1">Something went wrong</h1>
          <p className="mt-3 type-body-lg text-mauve">Please refresh the page and try again.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="container">
            <div className="error-content">
              <h2>Something went wrong</h2>
              <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
              <div className="error-actions">
                <button 
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  Refresh Page
                </button>
                <button 
                  onClick={() => this.setState({ hasError: false })}
                  className="btn btn-secondary"
                >
                  Try Again
                </button>
              </div>
              {import.meta.env.DEV && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development)</summary>
                  <pre>{this.state.error.stack}</pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
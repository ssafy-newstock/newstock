// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const queryClient = new QueryClient();

if (typeof global === 'undefined') {
  (window as any).global = window;
}

createRoot(document.getElementById('root')!).render(
  <>
    {/* <StrictMode> */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log('ErrorBoundary reset, retrying...');
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
    {/* </StrictMode> */}
  </>
);

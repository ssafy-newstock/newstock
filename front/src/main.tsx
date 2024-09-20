// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

if (typeof global === 'undefined') {
  (window as any).global = window;
}

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
  // <StrictMode>
  //   <QueryClientProvider client={queryClient}>
  //     <RouterProvider router={router} />
  //     <ReactQueryDevtools initialIsOpen={false} />
  //   </QueryClientProvider>
  // </StrictMode>
);

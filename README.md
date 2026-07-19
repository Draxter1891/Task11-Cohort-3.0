# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## SPA routing/ History API fallback
### I was stuck in client side routing refresh problem, my React app uses client-side routing with React Router. When I manually refresh or directly access a nested route like /signup, the browser sends the request to the server first. Since the server doesn't have a real /signup file, it returns a 404. The solution is to configure a History API Fallback (or SPA Rewrite) so the server always serves index.html, allowing React Router to handle the route on the client.
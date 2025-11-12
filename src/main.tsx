import { QueryClientProvider } from "@tanstack/react-query"
import { lazy, StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App.tsx"
import { queryClient } from "./config/index.ts"
import "./index.css"
import Layout from "./Layout.tsx"
const Detail = lazy(() => import("./pages/detail/index.tsx"))
const Search = lazy(() => import("./pages/search/index.tsx"))
const Favorite = lazy(() => import("./pages/favorite/index.tsx"))

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorite" element={<Favorite />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)

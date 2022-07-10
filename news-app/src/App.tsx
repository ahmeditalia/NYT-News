import { Alert } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { categories, category } from './categories';
import { ArticlesGridView } from './components/ArticlesGridView';
import { ArticleView } from './components/ArticleView';
import { Header } from './components/Header';
import { LogIn } from './components/LogIn';
import { Register } from './components/Register';
import { RoutesGuard } from './components/RouteGuard';
import { SearchPage } from './components/SearchPage.tsx';



function App() {
  const token = useAppSelector(state => state.user.token);
  return (
    <div className="App">
      <Routes>
        <Route element={<RoutesGuard guard={token} alt={"/authentication/login"} />} >
          <Route path='/' element={<Header />} >
            <Route index element={<ArticlesGridView category={categories[0].name} />} />
            <Route path={`:title`} element={<ArticleView />} />

            {
              categories.map(({ url, name }: category) => {
                return (
                  <React.Fragment key={name}>
                    <Route path={url} element={<ArticlesGridView category={name} />} />
                    <Route path={`${url}/:title`} element={<ArticleView category={name} />} />
                  </React.Fragment>
                )
              })
            }
            <Route path='search' element={<SearchPage />} />
            <Route path={`search/:title`} element={<ArticleView />} />
          </Route>

        </Route>
        <Route path='authentication' element={<RoutesGuard guard={!token} alt={"/"} />} >
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path="*" element={<Alert severity="warning">page not found</Alert>} />
      </Routes>
    </div >
  );

}

export default App;

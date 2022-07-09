import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { categories, category } from './categories';
import { ArticlesGridView } from './components/ArticlesGridView';
import { SearchGridView } from './components/ArticlesGridView/SearchGridView';
import { ArticleView } from './components/ArticleView';
import { Header } from './components/Header';
import { LogIn } from './components/LogIn';
import { RoutesGuard } from './components/RouteGuard';



function App() {
  const token = useAppSelector(state => state.user.token);
  return (
    <div className="App">
      <Routes>
        <Route element={<RoutesGuard guard={token} alt={"/authentication/login"} />} >
          <Route path='/' element={<Header />} >
            <Route index element={<ArticlesGridView category={categories[0].name} />} />
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
          <Route path='search' element={<SearchGridView />} />
          <Route path={`search/:title`} element={<ArticleView />} />
        </Route>

      </Route>
      <Route path='/authentication' element={<RoutesGuard guard={!token} alt={"/"} />} >
        <Route path='login' element={<LogIn />} />
      </Route>
      <Route path="*" element={<>page not found</>} />
    </Routes>
    </div >
  );

}

export default App;

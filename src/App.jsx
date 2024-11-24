import { useReducer, useState } from 'react'
//import './App.css'
import {data} from './data/module-data';
import RootLayout from './layouts/RootLayout';
import { Routes, Route, Outlet} from 'react-router-dom';
import Lab1Page from './pages/Lab1Page';
import Lab2Page from './pages/Lab2Page';
import Lab3Page from './pages/Lab3Page';
import Lab4Page from './pages/Lab4Page';
import EditForm from './components/EditForm';
import CreateForm from './components/CreateForm';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AppContext from './data/AppContext';
import AppReducer from './data/AppReducer';

const menuItems = [
  { id: 1, label: 'Home', url: '/', urlPattern: '/', element: <HomePage /> },
  { id: 2, label: 'Laboratorium 1', url: '/lab1', urlPattern: '/lab1', element: <Lab1Page names={data} /> },
  { id: 3, label: 'Laboratorium 2', url: '/lab2/1', urlPattern: '/lab2/:id', element: <Lab2Page /> },
  { id: 4, label: 'Laboratorium 3', url: '/lab3/', urlPattern: '/lab3/', element: <Lab3Page /> },
  { id: 5, label: 'Laboratorium 4', url: '/lab4/', urlPattern: '/lab4/', element: <Lab4Page /> }
];


function App() {
  const [count, setCount] = useState(0)

  const[state, appDispatch] = useReducer(AppReducer, data);

  return (
    <>
    <AppContext.Provider value={{items: state, dispatch: appDispatch}}>
      <RootLayout items={menuItems}>
          <Routes>
          {menuItems.map((item) => (
          <Route key={item.id} path={item.urlPattern} element={item.element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/lab4/edit' element={<EditForm/>}/>
          <Route path='/lab4/add' element={<CreateForm/>}/>
          </Routes>
          {/* <Route path='/lab4' element={<Lab4Page/>}/> */}
          
          {/* <SimpleLayout>
              <p>content</p>
          </SimpleLayout> */}
      </RootLayout>
      </AppContext.Provider>
    </>

  );
}

export default App

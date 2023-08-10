import './App.css';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Alerts from './pages/Alerts/Alerts';
import Analytics from './pages/Analytics/Analytics';
import * as React from 'react';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [title, setTitle] = React.useState('');

  const handleTitleChange = (variable) => {
    setTitle(variable);
  };

  const handleErrors = (error) => {
    toast.error('An error occurred!');
    console.error(error);
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<MiniDrawer title={title} />}
        >
          <Route
            index
            element={
              <ErrorBoundary handleErrors={handleErrors}>
                <Home onTitleChange={handleTitleChange} />
              </ErrorBoundary>
            }
          />
          <Route
            path="analytics"
            element={
              <ErrorBoundary handleErrors={handleErrors}>
                <Analytics onTitleChange={handleTitleChange} />
              </ErrorBoundary>
            }
          />
          <Route
            path="alerts"
            element={
              <ErrorBoundary handleErrors={handleErrors}>
                <Alerts onTitleChange={handleTitleChange} />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} exact></Route>
        <Route path="/register" element={<Register />} exact></Route>
      </Routes>
    </>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.handleErrors(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>An error occurred.</div>;
    }
    return this.props.children;
  }
}

export default App;

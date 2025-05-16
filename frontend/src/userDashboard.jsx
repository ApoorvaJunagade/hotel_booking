import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Login from './components/Login';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext'; // Use your AuthContext or state management

function UserDashboard() {
  const { user, isAdmin } = useContext(AuthContext); // Assuming you have context or state to track logged-in user and their role

  return (
    <Router>
      <Switch>
        {/* Admin routes */}
        <Route path="/admin" render={() => (
          isAdmin ? <AdminDashboard /> : <Redirect to="/login" />
        )} />

        {/* User routes */}
        <Route path="/user" render={() => (
          user ? <UserDashboard /> : <Redirect to="/login" />
        )} />

        {/* Login Route */}
        <Route path="/login" component={Login} />

        {/* Redirect to login if no match */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default UserDashboard;

import { useFetchUser } from '../services/authContext';
import Layout from '../components/Layout';
import SignUp from '../components/signUp';

const Signup = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <SignUp />
    </Layout>
  )
}

export default Signup;
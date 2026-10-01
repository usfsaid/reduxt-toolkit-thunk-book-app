
import './App.css';
import { Fragment } from 'react/jsx-runtime';
import Addform from './components/AddForm';
import PostContainer from './components/Book/BookContainer';
import Container from './components/Container';
import Header from './components/Header';

function App() {
  return (
    <Fragment>
      <Header/>
      <Container>
        <Addform/>
        <PostContainer/>
      </Container>
    </Fragment>
  );
}

export default App;

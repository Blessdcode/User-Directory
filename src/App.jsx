import { Footer } from "./components/footer";
import UserCollections from "./components/userCollections";
import UserDirectoryApp from "./components/userDirectoryApp"

function App() {
  return (
    <>
      <UserDirectoryApp />
      <UserCollections/>
      <Footer />
    </>
  );
}

export default App

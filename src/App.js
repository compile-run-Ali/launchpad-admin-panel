import { BrowserRouter as Router } from "react-router-dom";
import WebRouter from "./route";
import { ModalProvider } from "react-simple-modal-provider";
import modals from "./components/Modal";
import { UserProvider } from "./context/userContext/UserContext";
import Middleware from "./middleware/middleware";

function App() {
  return (
    <div className="">
      <ModalProvider value={modals}>
        <Router>
          <UserProvider>
            <Middleware>
              <WebRouter />
            </Middleware>
          </UserProvider>
        </Router>
      </ModalProvider>
    </div>
  );
}

export default App;

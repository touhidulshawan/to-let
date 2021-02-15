import OCR from "./containers/OCR";
import SignUp from "./components/SignUp";
import {AuthProvider} from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <main>
                <OCR/>
                <SignUp/>
            </main>
        </AuthProvider>
    );
};
export default App;

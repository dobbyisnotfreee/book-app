import './App.css';
import BookList from "./components/BookList";
import './styles.css'
import {ToasterProvider} from "./ui/ToasterContext"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BookDetails from "./components/BookDetails";
import SignIn from "./components/SignIn";
import {useEffect} from "react";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";
import {HeaderCss} from "./ui";

function App() {

    const [{}, dispatch] = useStateValue();


    useEffect(() => {
            auth.onAuthStateChanged(authUser => {
                console.log(authUser );

                if (authUser) {
                    //유저가 방금 로그인하거나 이미 한상태
                    dispatch({
                        type: 'SET_USER',
                        user: authUser

                    })

                } else {
                    //사용자가 로그아웃 되었을때
                    dispatch({
                        type: 'SET_USER',
                        user: null
                    })
                }
            })


        }, []


    )


    return (

        <Router>

            <ToasterProvider>
                <div className="App">
                  <HeaderCss />

                    {/* 위에 Header를 둬야함 */}

                    <Switch>

                        <Route exact path="/">
                            <BookList/>

                        </Route>
                        <Route path="/book/:id">

                            <BookDetails />

                        </Route>

                        <Route path="/login">

                            <SignIn />

                        </Route>

                    </Switch>


                </div>
            </ToasterProvider>

        </Router>


    );
}

export default App;
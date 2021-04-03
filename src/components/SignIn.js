import React, {useState} from 'react';
import {Button, Field, Message} from "../ui";
import {auth} from "../firebase";
import {useHistory} from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            history.push(`/`)
        } catch (e) {
            console.error(e);
            setError(e.message);
        }


    }


    const handleSignUp = async(e) => {
        e.preventDefault();
        await auth.createUserWithEmailAndPassword(email, password).then((e) =>
            history.push(`/`)
        ).catch((e) => alert(e.message))


    }

    return (
        <div className="signIn">
            <h2> 로그인 </h2>

            <form>
                <Field labelText="이메일 :">
                    <input type="email" name="email" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </Field>
                <Field labelText="패스워드 : ">
                    <input type="password" name="password" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </Field>
                <Button type="submit" onClick={handleSubmit} loading={loading}> 로그인하기 </Button>
                <Button type="submit" onClick={handleSignUp} loading={loading}> 회원가입하기 </Button>

                <Message text={error} type="error"/>
            </form>

        </div>
    );
}

export default SignIn;
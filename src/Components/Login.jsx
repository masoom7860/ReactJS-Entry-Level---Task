import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.scss"

function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        // console.log(localStorage.getItem('user-info'));
        const userInfo = localStorage.getItem('user-info');
        if (userInfo !== null) {
            navigate("/index")
        }
    }, [])

    const login = () => {
        console.log(email, password)
        let item = { email, password }
        let result = fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            return result.json()
        }).then((result) => {
            if (result.hasOwnProperty("error")) {
                setErrorText(result.error);
                localStorage.removeItem("user-info")
            } else if (result.hasOwnProperty("token")) {
                localStorage.setItem("user-info", JSON.stringify(result));
                setErrorText("");
                navigate("/index")
            } else {
                setErrorText("something went wrong");
                localStorage.removeItem("user-info")
            }

            console.log(result)
        }).catch((err) => {
            console.log('err', err)
        })
    }

    return (
        <div className='login-page'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="form-design">
                            <div className='form-design-header'>
                                <h1>Login Page</h1>

                            </div>

                            {errorText !== "" && (<span className='error text-danger'>{errorText}</span>)}
                            <div className="email-address mb-3">
                                <label htmlFor='email' className='email-address-label mx-4'>Email Address</label>
                                <input id="email" type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                            </div>
                            <div className="mb-5">
                                <label htmlFor='password' className='password mx-4'>Password</label>
                                <input id="password" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            
                                <button type="button" className="btn btn-primary mb-5 w-50" onClick={login}>Submit</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
import React,{useState} from 'react'

import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, SetCredentials] = useState({name:"", email: "", password: "",cpassword:"" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name,email,password} = credentials
    const response = await fetch(
      `http://localhost:5000/api/auth/createUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password})
      }
    );
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth and redirect
      localStorage.setItem('token', json.authToken)
      navigate('/')
      props.showAlert("Account Created Successfully","success")
    }
    else {
      props.showAlert("Invalid Credentials","danger")
    }
  }
  const onChange = (e) => {
    SetCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' minLength={5} id="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' minLength={5} id="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup

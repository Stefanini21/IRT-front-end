import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

const Login = () => (
    <Form>
        <h1>Login</h1>
        <Form.Field required>
            <label>Username</label>
            <Input placeholder='enter username' />
            <label>Password</label>
            <Input placeholder='enter password' />
        </Form.Field>
        <Button.Group>
            <Button color='twitter'>Login</Button>
            <Button.Or />
            <Button>Registration</Button>
        </Button.Group>
        <h4><a href="https://">forgot password</a></h4>
    </Form>
)

export default Login;
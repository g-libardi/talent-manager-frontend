import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useAuth from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import useStore from "@/hooks/useStore"

export const pageConfig = {
  layout: null,
}


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading ] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      await login({ username, password })
      console.log(useStore.getState().auth.accessToken)
      if (useStore.getState().auth.accessToken) {
        console.log('Logged in')
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Input id="username" placeholder="Username" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
              <Input id="password" placeholder="Password" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={loading} type="submit">
              Sign in {loading && '...'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

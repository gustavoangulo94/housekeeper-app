import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { AcCard, AcCardContent, AcCardHeader, AcCardTitle } from "@/components/ui/ac-card"
import { AcInput } from "@/components/ui/ac-input"
import { AcButton } from "@/components/ui/ac-button"
import { useUser, simulateLoginFromEmail } from "@/hooks/use-user"
import { Eye, EyeOff } from "lucide-react"

const Login: React.FC = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({})
  
  const { setUser } = useUser()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (!password) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    try {
      // Simulate login by creating user based on email
      const user = simulateLoginFromEmail(email)
      setUser(user)
      
      // Show success message (would use AcToast in real implementation)
      console.log("Login successful!")
      
      // Redirect to dashboard
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ac-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AcCard>
          <AcCardHeader className="text-center">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-ac-accent mb-2">Aircasa</h1>
              <p className="text-ac-muted text-sm">Short-term rental cleaning control</p>
            </div>
            <AcCardTitle>Welcome back</AcCardTitle>
          </AcCardHeader>
          <AcCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AcInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                required
              />
              
              <div className="relative">
                <AcInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-ac-muted hover:text-ac-fg"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <AcButton
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </AcButton>
            </form>

            <div className="mt-6 p-4 bg-ac-bg-alt rounded-ac">
              <p className="text-xs text-ac-muted">
                <strong>Demo tip:</strong> Use an email containing 'owner', 'mediator', or 'cleaner' 
                to simulate different roles; otherwise you'll be logged in as a tenant.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-ac-muted">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-ac-accent hover:underline font-medium"
                >
                  Create account
                </Link>
              </p>
            </div>
          </AcCardContent>
        </AcCard>
      </div>
    </div>
  )
}

export default Login

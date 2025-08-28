import * as React from "react"
import { AcCard, AcCardContent, AcCardHeader, AcCardTitle } from "@/components/ui/ac-card"
import { AcButton } from "@/components/ui/ac-button"
import { Construction } from "lucide-react"

interface PlaceholderProps {
  title: string
  description?: string
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-ac-bg">
      <div className="ac-container py-8">
        <AcCard className="max-w-md mx-auto">
          <AcCardHeader className="text-center">
            <Construction className="h-12 w-12 text-ac-muted mx-auto mb-4" />
            <AcCardTitle>{title}</AcCardTitle>
          </AcCardHeader>
          <AcCardContent className="text-center">
            <p className="text-ac-muted mb-6">
              {description || "This page is under construction. Continue prompting to have it built!"}
            </p>
            <AcButton onClick={() => window.history.back()}>
              Go Back
            </AcButton>
          </AcCardContent>
        </AcCard>
      </div>
    </div>
  )
}

export default Placeholder

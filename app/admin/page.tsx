import QuestionManager from '@/components/question-manager'
import UserManager from '@/components/user-manager'
import React from 'react'

function AdminPage() {
  return (
    <div className="container mx-auto p-4">
<div className="container mx-auto p-4">
        <QuestionManager/>
        
    </div>
    <div>
        <UserManager/>

    </div>
    </div>
    
    
  )
}

export default AdminPage
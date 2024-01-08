import AuthButton from '../../components/AuthButton'
import UserManagement from '../../components/UserManagement'

export default async function Index() {

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3">
        <main className="flex-1 flex flex-col gap-6">
          <UserManagement />
        </main>
      </div>
    </div>
  )
}

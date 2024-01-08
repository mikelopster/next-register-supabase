'use client'

import { useFormState } from 'react-dom'
import { register } from './actions'

const initialState = {
  success: false,
  message: null,
}

export default async function Index() {
  const [state, formAction] = useFormState(register, initialState)

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action={formAction}
          >
            <div>Register Form</div>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="text"
              name="fullname"
              placeholder="Fullname"
            />
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="text"
              name="tel"
              placeholder="Tel"
            />
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="file"
              name="attachment"
            />
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
              Submit Form
            </button>

            {state.message && <div>Error: {state.message}</div>}
            {state.success && (
              <div className="bg-green-500 p-4">Register Successful !</div>
            )}
          </form>
        </main>
      </div>
    </div>
  )
}

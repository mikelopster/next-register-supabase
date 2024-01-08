'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserManagement() {
  const supabase = createClient()
  const itemsPerPage = 2

  const [searchValue, setSearchValue] = useState('')
  const [users, setUsers] = useState<any>([])
  const [page, setPage] = useState(1)
  const [numberOfUsers, setNumberOfUsers] = useState<number>(1)

  const userSupabaseQuery = () => {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
    if (searchValue) {
      query = query.like('fullname', `%${searchValue}%`)
    }
    query = query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
    return query
  }

  const fetchUsers = async () => {
    const { data: usersData, error, count } = await userSupabaseQuery()
    if (!usersData || error) {
      return false
    }
    setUsers(usersData)
    setNumberOfUsers(count || 1)
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value)
  }

  const searchUser = async () => {
    const { data: usersData, error, count } = await userSupabaseQuery()
    setUsers(usersData)
    setPage(1)
    setNumberOfUsers(count || 1)
  }

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3">
      <div className="flex gap-2 items-center">
        <input
          className="rounded-md px-4 py-2 bg-inherit border w-full"
          type="text"
          onChange={handleSearchChange}
        />
        <button onClick={searchUser}>Search</button>
      </div>
      <main className="flex-1 flex flex-col gap-6">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Full Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Telephone</th>
              <th className="border border-gray-200 px-4 py-2">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>
                  <a href={user.attachment}>Download file</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm ">
            Page {page}/{numberOfUsers/itemsPerPage} of{' '}
            {numberOfUsers} Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            {page > 1 ? (
              <button
                onClick={() => setPage(page - 1)}
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Previous
              </button>
            ) : (
              ''
            )}
            {page < numberOfUsers / itemsPerPage ? (
              <button
                onClick={() => setPage(page + 1)}
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Next
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

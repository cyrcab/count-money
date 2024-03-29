import { User as UserInterface } from '@prisma/client'
import { comparePwd } from '../utils/Pwd'
import { prisma } from '../../libs/prisma'

const prismaUser = prisma.user

export async function loginUser(data: Partial<UserInterface>) {
  const { email, password } = data

  if (!email || !password) {
    return { status: 400, body: { msg: 'Please enter all fields' } }
  }

  // regex for email validation
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  // check if email is valid
  if (!regexEmail.test(email)) {
    return { status: 400, body: { msg: 'Please enter a valid email' } }
  }

  try {
    // check if user exists
    const user = await prismaUser.findUnique({
      where: {
        email: email,
      },
    })
    if (!user) {
      return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    if (user.isOauth) {
      return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    // check if password is correct
    const isMatch = await comparePwd(password, user.password)
    if (!isMatch) {
      return { status: 400, body: { msg: 'Invalid credentials' } }
    }

    return {
      status: 200,
      body: {
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          roleId: user.roleId,
        },
      },
    }
  } catch (err) {
    return { status: 500, body: { msg: err.message } }
  }
}

export {default } from 'next-auth/middleware'

export const config = {
    matcher: [
          '/issues/new',
        //   '/issues/:id/edit',  //earlier version
          '/issues/edit/:id+' //Mosh version
    ]
}
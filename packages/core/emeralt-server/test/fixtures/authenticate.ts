export const authenticateFixtures = [
  {
    request: {
      body: {
        _id: 'org.couchdb.user:tester',
        name: 'tester',
        password: 'tester',
        type: 'user',
        roles: [],
        date: new Date().toString(),
      },
    },
    response: {
      status: 401,
      body: {
        id: 'tester',
        ok: false,
        token: null,
      },
    },
  },
]

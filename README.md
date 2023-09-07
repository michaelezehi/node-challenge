# The BFX challenge

- The below code tries to tackle this challenge
- It can be tested by running the test in the project

Requirement:

- You have `node` installed -- version 16 or greater

## Installation and setup

```
yarn install or npm install
```

## Running the test

### Standard tests

```
yarn test or npm test
```

### Test coverage

```
yarn test:coverage or npm run test:coverage
```

## Recommendations

The implementation of priority and race condition is only basic; the below are suggestion can be use to improve this project

1. **Use TypeScript**: Adding TypeScript can provide static type checking, making the code more robust and easier to maintain.
  
2. **Utilise async-mutex**: Using `async-mutex` can make the handling of race conditions more efficient, especially for more complex asynchronous operations.

3. **Utilise priorityqueuejs**: Using a library like `priorityqueuejs` can make the priority queue implementation more efficient and easier to manage.

4. **RESTful API**: Expose the functionality through a RESTful API, allowing it to be easily integrated into web applications or other services.

5. **WebSockets**: For real-time updates, consider implementing a WebSocket server to push updates to connected clients.

6. **Logging and Monitoring**: Implement comprehensive logging and monitoring to track errors, order matches, and other significant events.

7. **Unit Tests and CI/CD**: Expand the unit tests to cover more edge cases and integrate with a CI/CD pipeline for automated testing and deployment.

8. **User Authentication**: If this is to be exposed as a service, adding user authentication and authorization would be essential for security.

9. **Rate Limiting**: Implement rate limiting to prevent abuse of the service.

By implementing some or all of these recommendations, the code could be made more robust, maintainable, and extendable.

